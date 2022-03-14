import chatMessage from '../../../../components/chatMessage.js';
import { getEventCards } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import main from '../../../../config/main.js';
import messages from '../../../../config/messages.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!DEPOSITEVENTCARDS') || input.match('!EVDP') || [];
  const amountofCards = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountofCards) && amountofCards > 0) {
    log.adminChat(
      sender.getSteamID64(),
      `[ !DEPOSITEVENTCARDS ${amountofCards} ]`
    );
    chatMessage(sender, messages.request);

    getEventCards(sender.getSteamID64(), (error, data) => {
      if (!error) {
        const theirCards = [];

        let amount = amountofCards;
        for (let i = 0; i < data.length; i += 1) {
          if (amount > 0) {
            theirCards.push(data[i]);
            amount -= 1;
          }
        }

        if (amount > 0) {
          chatMessage(
            sender,
            messages.error.outofstock.admin.eventCards.them
              .replace(/{EVENTNAME}/g, main.eventName)
              .replace('{EVENTCARDS}', theirCards.length)
          );
        } else {
          const message = messages.trade.message.eventCards[0]
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace('{EVENTCARDS}', amountofCards);

          makeOffer(
            sender.getSteamID64(),
            [],
            [].concat(...theirCards),
            '!DEPOSITEVENTCARDS',
            message,
            amountofCards,
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
      messages.error.inputinvalid.eventCards
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{command}', `${command} 1`)
    );
  }
};
