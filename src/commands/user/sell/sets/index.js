/* eslint-disable no-restricted-syntax */

import chatMessage from '../../../../components/chatMessage.js';
import {
  getAvailableSetsForCustomer,
  getEventCards,
} from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import rates from '../../../../config/rates.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';
import { sortSetsByAmount } from '../../../../components/utils.js';
import main from '../../../../config/main.js';

export default (sender, msg) => {
  const amountOfSets = parseInt(
    msg.toUpperCase().replace('!SELLSETS ', ''),
    10
  );

  if (!Number.isNaN(amountOfSets) && amountOfSets > 0) {
    log.userChat(sender.getSteamID64(), `[ !SELLSETS ${amountOfSets} ]`);
    chatMessage(sender, messages.request);

    const theirCards = [];
    const mySets = [];

    getEventCards(sender.getSteamID64(), async (error1, inv) => {
      if (!error1) {
        for (let i = 0; i < inv.length; i += 1) {
          if (theirCards.length < amountOfSets * rates.sell.sets) {
            theirCards.push(inv[i]);
          }
        }

        if (theirCards.length !== amountOfSets * rates.sell.sets) {
          chatMessage(
            sender,
            messages.error.outofstock.common.eventCards.them.replace(
              '{EVENTNAME}',
              main.eventName
            )
          );
        } else {
          try {
            const availableSets = await getAvailableSetsForCustomer(
              sender.getSteamID64(),
              true,
              false,
              amountOfSets
            );

            const sortedSets = sortSetsByAmount(availableSets);

            for (let i = 0; i < sortedSets.length; i += 1) {
              if (availableSets[sortedSets[i]]) {
                for (
                  let j = 0;
                  j < availableSets[sortedSets[i]].length;
                  j += 1
                ) {
                  mySets.push(availableSets[sortedSets[i]][j]);
                }
              }
            }

            if (mySets.length !== amountOfSets) {
              chatMessage(sender, messages.error.outofstock.common.sets.me);
            } else {
              const message = messages.trade.message.sets[1]
                .replace('{SETS}', mySets.length)
                .replace(/{EVENTNAME}/g, main.eventName)
                .replace('{EVENTCARDS}', theirCards.length);

              makeOffer(
                sender.getSteamID64(),
                [].concat(...mySets),
                theirCards,
                '!SELLSETS',
                message,
                mySets.length,
                theirCards.length
              );
            }
          } catch (error) {
            log.error(error);
          }
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
      messages.error.inputinvalid.sets.replace('{command}', '!SELLSETS 1')
    );
  }
};
