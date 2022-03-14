/* eslint-disable no-restricted-syntax */

import chatMessage from '../../../../components/chatMessage.js';
import { getInventory, stock } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import rates from '../../../../config/rates.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';
import {
  getCardsInSets,
  getSets,
  sortSetsByAmount,
} from '../../../../components/utils.js';
import main from '../../../../config/main.js';

export default (sender, msg) => {
  const amountOfSets = parseInt(msg.toUpperCase().replace('!BUYSETS ', ''), 10);

  if (!Number.isNaN(amountOfSets) && amountOfSets > 0) {
    log.userChat(sender.getSteamID64(), `[ !BUYSETS ${amountOfSets} ]`);
    chatMessage(sender, messages.request);

    const myCards = [];

    for (let i = 0; i < stock.botEventCards.length; i += 1) {
      if (myCards.length < amountOfSets * rates.buy.sets) {
        myCards.push(stock.botEventCards[i]);
      }
    }

    if (myCards.length !== amountOfSets * rates.buy.sets) {
      chatMessage(
        sender,
        messages.error.outofstock.common.eventCards.me.replace(
          '{EVENTNAME}',
          main.eventName
        )
      );
    } else {
      getInventory(sender.getSteamID64(), (error, data) => {
        if (!error) {
          const theirSets = [];
          const allCards = getCardsInSets();
          const sets = getSets(data, allCards);
          const sortedSets = sortSetsByAmount(sets);

          let amount = amountOfSets;
          for (let i = 0; i < sortedSets.length; i += 1) {
            if (sets[sortedSets[i]]) {
              for (let j = 0; j < sets[sortedSets[i]].length; j += 1) {
                if (amount > 0) {
                  theirSets.push(sets[sortedSets[i]][j]);
                  amount -= 1;
                }
              }
            }
          }

          if (amount > 0) {
            chatMessage(sender, messages.error.outofstock.common.sets.them);
          } else {
            const message = messages.trade.message.sets[1]
              .replace('{SETS}', amountOfSets)
              .replace(/{EVENTNAME}/g, main.eventName)
              .replace('{EVENTCARDS}', amountOfSets * rates.buy.sets);

            makeOffer(
              sender.getSteamID64(),
              myCards,
              [].concat(...theirSets),
              '!BUYSETS',
              message,
              myCards.length,
              theirSets.length
            );
          }
        } else if (error.message.indexOf('profile is private') > -1) {
          chatMessage(sender, messages.error.privateinventory);
          log.error(`An error occurred while getting user inventory: ${error}`);
        } else {
          chatMessage(sender, messages.error.loadinventory.them);
          log.error(`An error occurred while getting user inventory: ${error}`);
        }
      });
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.sets.replace('{command}', '!BUYSETS 1')
    );
  }
};
