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
  const amountOfKeys = parseInt(msg.toUpperCase().replace('!BUYCSGO ', ''), 10);

  if (!Number.isNaN(amountOfKeys) && amountOfKeys > 0) {
    log.userChat(sender.getSteamID64(), `[ !BUYCSGO ${amountOfKeys} ]`);
    chatMessage(sender, messages.request);

    const myCards = [];

    for (let i = 0; i < stock.botEventCards.length; i += 1) {
      if (myCards.length < amountOfKeys * rates.buy.csgo) {
        myCards.push(stock.botEventCards[i]);
      }
    }

    if (myCards.length !== amountOfKeys * rates.buy.csgo) {
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
        730,
        2,
        true,
        (error, keys) => {
          if (!error) {
            const theirKeys = [];

            for (let i = 0; i < keys.length; i += 1) {
              if (currencies.csgo.includes(keys[i].market_hash_name)) {
                if (theirKeys.length < amountOfKeys) {
                  theirKeys.push(keys[i]);
                }
              }
            }

            if (theirKeys.length !== amountOfKeys) {
              chatMessage(sender, messages.error.outofstock.common.keys.them);
            } else {
              const message = messages.trade.message.csgo[1]
                .replace('{KEYS}', amountOfKeys)
                .replace(/{EVENTNAME}/g, main.eventName)
                .replace('{EVENTCARDS}', amountOfKeys * rates.buy.csgo);

              makeOffer(
                sender.getSteamID64(),
                myCards,
                [].concat(...theirKeys),
                '!BUYCSGO',
                message,
                myCards.length,
                theirKeys.length,
                0
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
      messages.error.inputinvalid.keys.replace('{command}', '!BUYCSGO 1')
    );
  }
};
