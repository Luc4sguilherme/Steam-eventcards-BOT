/* eslint-disable no-restricted-syntax */

import chatMessage from '../../../../components/chatMessage.js';
import { stock } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import rates from '../../../../config/rates.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';
import main from '../../../../config/main.js';
import currencies from '../../../../config/currencies.js';
import { community } from '../../../../components/client.js';

export default (sender, msg) => {
  const amountOfCards = parseInt(
    msg.toUpperCase().replace('!BUYGEMS ', ''),
    10
  );

  if (!Number.isNaN(amountOfCards) && amountOfCards > 0) {
    log.userChat(sender.getSteamID64(), `[ !BUYGEMS ${amountOfCards} ]`);
    chatMessage(sender, messages.request);

    const myCards = [];

    for (let i = 0; i < stock.botEventCards.length; i += 1) {
      if (myCards.length < amountOfCards) {
        myCards.push(stock.botEventCards[i]);
      }
    }

    if (myCards.length !== amountOfCards) {
      chatMessage(
        sender,
        messages.error.outofstock.common.eventCards.me.replace(
          '{EVENTNAME}',
          main.eventName
        )
      );
    } else {
      community.getUserInventoryContents(
        sender.getSteamID64(),
        753,
        6,
        true,
        (error, data) => {
          if (!error) {
            const theirGems = [];

            const gems = data;
            let need = amountOfCards * rates.buy.gems;

            for (let i = 0; i < data.length; i += 1) {
              if (need !== 0) {
                if (currencies.gems.indexOf(gems[i].market_hash_name) >= 0) {
                  gems[i].amount =
                    need <= gems[i].amount ? need : gems[i].amount;
                  need -= gems[i].amount;

                  theirGems.push(gems[i]);
                }
              } else {
                break;
              }
            }

            if (need > 0) {
              chatMessage(sender, messages.error.outofstock.common.gems.them);
            } else {
              const message = messages.trade.message.gems[1]
                .replace('{GEMS}', amountOfCards * rates.buy.gems)
                .replace(/{EVENTNAME}/g, main.eventName)
                .replace('{EVENTCARDS}', amountOfCards);

              makeOffer(
                sender.getSteamID64(),
                myCards,
                [].concat(...theirGems),
                '!BUYGEMS',
                message,
                myCards.length,
                0,
                amountOfCards * rates.buy.gems
              );
            }
          } else if (error.message.indexOf('profile is private') > -1) {
            chatMessage(sender, messages.error.privateinventory);
            log.error(
              `An error occurred while getting user inventory: ${error}`
            );
          } else {
            chatMessage(sender, messages.error.loadinventory.them);
            log.error(
              `An error occurred while getting user inventory: ${error}`
            );
          }
        }
      );
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.eventCards
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{command}', `!BUYGEMS 1`)
    );
  }
};
