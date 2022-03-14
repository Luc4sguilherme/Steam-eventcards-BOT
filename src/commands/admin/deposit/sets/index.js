import chatMessage from '../../../../components/chatMessage.js';
import { getInventory } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import {
  getCardsInSets,
  getSets,
  sortSetsByAmount,
} from '../../../../components/utils.js';
import messages from '../../../../config/messages.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!DEPOSITSETS') ||
    input.match('!DEPOSITSET') ||
    input.match('!SETSDEPOSIT') ||
    input.match('!SETDEPOSIT') ||
    input.match('!SEDP') ||
    [];
  const amountofsets = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountofsets) && amountofsets > 0) {
    log.adminChat(sender.getSteamID64(), `[ !DEPOSITSETS ${amountofsets} ]`);
    chatMessage(sender, messages.request);

    getInventory(sender.getSteamID64(), (error, data) => {
      if (!error) {
        const theirSets = [];
        const allCards = getCardsInSets();
        const sets = getSets(data, allCards);
        const sortedSets = sortSetsByAmount(sets);

        let amount = amountofsets;
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
          chatMessage(
            sender,
            messages.error.outofstock.admin.sets.them.replace(
              '{SETS}',
              theirSets.length
            )
          );
        } else {
          const message = messages.trade.message.sets[0].replace(
            '{SETS}',
            amountofsets
          );

          makeOffer(
            sender.getSteamID64(),
            [],
            [].concat(...theirSets),
            '!DEPOSITSETS',
            message,
            amountofsets,
            0,
            0,
            0
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
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.sets.replace('{command}', `${command} 1`)
    );
  }
};
