import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';
import { manager } from './client.js';
import log from './log.js';

export default (
  target,
  itemsFromMe,
  itemsFromThem,
  commandused,
  message,
  amountofsets = 0,
  amountofeventcards = 0,
  amountofkeys = 0,
  amountofgems = 0
) => {
  const offer = manager.createOffer(target);

  offer.addMyItems(itemsFromMe);
  offer.addTheirItems(itemsFromThem);

  log.tradeoffer('Creating trade offer');

  offer.data('commandused', commandused);

  if (amountofsets) {
    offer.data('amountofsets', amountofsets);
  }

  if (amountofeventcards) {
    offer.data('amountofeventcards', amountofeventcards);
  }

  if (amountofkeys) {
    offer.data('amountofkeys', amountofkeys);
  }

  if (amountofgems) {
    offer.data('amountofgems', amountofgems);
  }

  offer.setMessage(message);
  offer.getUserDetails((error1, me, them) => {
    if (error1) {
      log.error(`An error occurred while getting trade holds: ${error1}`);
      chatMessage(target, messages.error.tradehold);
    } else if (me.escrowDays === 0 && them.escrowDays === 0) {
      log.tradeoffer('Sending trade offer');
      offer.send((error2) => {
        if (error2) {
          chatMessage(target, messages.error.sendtrade);
          log.error(`An error occurred while sending trade offer: ${error2}`);
        } else {
          chatMessage(target, `${messages.trade.check} \n\n`);
          log.tradeoffer(
            `offer #${offer.id} sent successfully to user #${target}`
          );
        }
      });
    } else {
      chatMessage(target, messages.error.tradehold);
    }
  });
};
