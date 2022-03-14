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
  const amountOfKeys = parseInt(
    msg.toUpperCase().replace('!SELLHYDRA ', ''),
    10
  );

  if (!Number.isNaN(amountOfKeys) && amountOfKeys > 0) {
    log.userChat(sender.getSteamID64(), `[ !SELLHYDRA ${amountOfKeys} ]`);
    chatMessage(sender, messages.request);

    const theirCards = [];
    const myKeys = [];

    getEventCards(sender.getSteamID64(), async (error1, inv) => {
      if (!error1) {
        for (let i = 0; i < inv.length; i += 1) {
          if (theirCards.length < amountOfKeys * rates.sell.hydra) {
            theirCards.push(inv[i]);
          }
        }

        if (theirCards.length < amountOfKeys * rates.sell.hydra) {
          chatMessage(
            sender,
            messages.error.outofstock.common.eventCards.them.replace(
              '{EVENTNAME}',
              main.eventName
            )
          );
        } else {
          community.getUserInventoryContents(
            client.steamID.getSteamID64(),
            730,
            2,
            true,
            (error2, keys) => {
              if (!error2) {
                for (let i = 0; i < keys.length; i += 1) {
                  if (currencies.hydra.includes(keys[i].market_hash_name)) {
                    if (myKeys.length < amountOfKeys) {
                      myKeys.push(keys[i]);
                    }
                  }
                }

                if (myKeys.length !== amountOfKeys) {
                  chatMessage(sender, messages.error.outofstock.common.keys.me);
                } else {
                  const message = messages.trade.message.hydra[1]
                    .replace('{KEYS}', amountOfKeys)
                    .replace(/{EVENTNAME}/g, main.eventName)
                    .replace('{EVENTCARDS}', amountOfKeys * rates.sell.hydra);

                  makeOffer(
                    sender.getSteamID64(),
                    [].concat(...myKeys),
                    theirCards,
                    '!SELLHYDRA',
                    message,
                    theirCards.length,
                    myKeys.length,
                    0
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
      messages.error.inputinvalid.keys.replace('{command}', '!SELLHYDRA 1')
    );
  }
};
