/* eslint-disable no-restricted-syntax */

import chatMessage from '../../../../components/chatMessage.js';
import { getEventCards } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import rates from '../../../../config/rates.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';
import main from '../../../../config/main.js';
import { client, community } from '../../../../components/client.js';
import currencies from '../../../../config/currencies.js';

export default (sender, msg) => {
  const amountOfCards = parseInt(
    msg.toUpperCase().replace('!SELLGEMS ', ''),
    10
  );

  if (!Number.isNaN(amountOfCards) && amountOfCards > 0) {
    log.userChat(sender.getSteamID64(), `[ !SELLGEMS ${amountOfCards} ]`);
    chatMessage(sender, messages.request);

    const theirCards = [];
    const myGems = [];

    getEventCards(sender.getSteamID64(), async (error1, inv) => {
      if (!error1) {
        for (let i = 0; i < inv.length; i += 1) {
          if (theirCards.length < amountOfCards) {
            theirCards.push(inv[i]);
          }
        }

        if (theirCards.length < amountOfCards) {
          chatMessage(
            sender,
            messages.error.outofstock.common.eventCards.them.replace(
              /{EVENTNAME}/g,
              main.eventName
            )
          );
        } else {
          community.getUserInventoryContents(
            client.steamID.getSteamID64(),
            753,
            6,
            true,
            (error2, data) => {
              if (!error2) {
                const gems = data;
                let need = amountOfCards * rates.sell.gems;

                for (let i = 0; i < data.length; i += 1) {
                  if (need !== 0) {
                    if (
                      currencies.gems.indexOf(gems[i].market_hash_name) >= 0
                    ) {
                      gems[i].amount =
                        need <= gems[i].amount ? need : gems[i].amount;
                      need -= gems[i].amount;

                      myGems.push(gems[i]);
                    }
                  } else {
                    break;
                  }
                }

                if (need > 0) {
                  chatMessage(sender, messages.error.outofstock.common.gems.me);
                } else {
                  const message = messages.trade.message.gems[1]
                    .replace(/{EVENTNAME}/g, main.eventName)
                    .replace('{GEMS}', amountOfCards * rates.sell.gems)
                    .replace('{EVENTCARDS}', amountOfCards);

                  makeOffer(
                    sender.getSteamID64(),
                    [].concat(...myGems),
                    theirCards,
                    '!SELLGEMS',
                    message,
                    theirCards.length,
                    0,
                    amountOfCards * rates.sell.gems
                  );
                }
              } else {
                chatMessage(sender, messages.error.loadinventory.me);
                log.error(
                  `An error occurred while loading the bot's inventory: ${error2}`
                );
              }
            }
          );
        }
      } else if (error1.message.indexOf('profile is private') > -1) {
        chatMessage(sender, messages.error.privateinventory);
        log.error(`An error occurred while getting user inventory: ${error1}`);
      } else {
        chatMessage(sender, messages.error.loadinventory.them);
        log.error(`An error occurred while getting user inventory: ${error1}`);
      }
    });
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.eventCards
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{command}', `!SELLGEMS 1`)
    );
  }
};
