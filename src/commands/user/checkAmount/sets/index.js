import chatMessage from '../../../../components/chatMessage.js';
import log from '../../../../components/log.js';
import main from '../../../../config/main.js';
import messages from '../../../../config/messages.js';
import rates from '../../../../config/rates.js';

export default (sender, msg) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKSETS ', ''), 10);

  if (!Number.isNaN(n) && n > 0) {
    log.userChat(sender.getSteamID64(), `[ !CHECKSETS ${n} ]`);

    if (main.maxCheck.sets >= n) {
      if (n >= 1) {
        chatMessage(
          sender,
          messages.checkAmount.sets
            .replace(/{EVENTCARDS}/g, n * rates.buy.sets)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{SETS}/g, n)
        );
      } else {
        chatMessage(sender, messages.error.inputinvalid.amountlow.sets);
      }
    } else {
      chatMessage(sender, messages.error.inputinvalid.amountover.sets);
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.sets.replace('{command}', '!CHECKSETS 1')
    );
  }
};
