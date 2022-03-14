import log from '../../../../components/log.js';
import chatMessage from '../../../../components/chatMessage.js';
import { stock } from '../../../../components/inventory.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';
import main from '../../../../config/main.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!WITHDRAWEVENTCARDS') || input.match('!EVWD') || [];
  const amountofCards = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountofCards) && amountofCards > 0) {
    log.adminChat(
      sender.getSteamID64(),
      `[ !WITHDRAWEVENTCARDS ${amountofCards} ]`
    );
    chatMessage(sender, messages.request);

    const myCards = [];

    let amount = amountofCards;
    for (let i = 0; i < stock.botEventCards.length; i += 1) {
      if (amount > 0) {
        myCards.push(stock.botEventCards[i]);
        amount -= 1;
      }
    }

    if (amount > 0) {
      chatMessage(
        sender,
        messages.error.outofstock.admin.eventCards.me
          .replace(/{EVENTNAME}/g, main.eventName)
          .replace('{EVENTCARDS}', myCards.length)
      );
    } else {
      const message = messages.trade.message.eventCards[0]
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{EVENTCARDS}', amountofCards);

      makeOffer(
        sender.getSteamID64(),
        [].concat(...myCards),
        [],
        '!WITHDRAWEVENTCARDS',
        message,
        amountofCards,
        0,
        0
      );
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.eventCards
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{command}', `${command} 1`)
    );
  }
};
