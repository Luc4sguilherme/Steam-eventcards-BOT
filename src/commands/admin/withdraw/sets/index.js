import log from '../../../../components/log.js';
import chatMessage from '../../../../components/chatMessage.js';
import { stock } from '../../../../components/inventory.js';
import { sortSetsByAmount } from '../../../../components/utils.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!WITHDRAWSETS') ||
    input.match('!WITHDRAWSET') ||
    input.match('!SETSWITHDRAW') ||
    input.match('!SETWITHDRAW') ||
    input.match('!SEWD') ||
    [];
  const amountofSets = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountofSets) && amountofSets > 0) {
    log.adminChat(sender.getSteamID64(), `[ !WITHDRAWSETS ${amountofSets} ]`);
    chatMessage(sender, messages.request);

    const mySets = [];
    const sortedSets = sortSetsByAmount(stock.botSets);

    let amount = amountofSets;
    for (let i = 0; i < sortedSets.length; i += 1) {
      if (stock.botSets[sortedSets[i]]) {
        for (let j = 0; j < stock.botSets[sortedSets[i]].length; j += 1) {
          if (amount > 0) {
            mySets.push(stock.botSets[sortedSets[i]][j]);
            amount -= 1;
          }
        }
      }
    }

    if (amount > 0) {
      chatMessage(
        sender,
        messages.error.outofstock.admin.sets.me.replace(
          '{SETS}',
          stock.totalBotSets
        )
      );
    } else {
      const message = messages.trade.message.sets[0].replace(
        '{SETS}',
        amountofSets
      );

      makeOffer(
        sender.getSteamID64(),
        [].concat(...mySets),
        [],
        '!WITHDRAWSETS',
        message,
        amountofSets,
        0,
        0,
        0
      );
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.sets.replace('{command}', `${command} 1`)
    );
  }
};
