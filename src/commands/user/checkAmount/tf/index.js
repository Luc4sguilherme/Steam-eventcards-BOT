import chatMessage from '../../../../components/chatMessage.js';
import log from '../../../../components/log.js';
import main from '../../../../config/main.js';
import messages from '../../../../config/messages.js';
import rates from '../../../../config/rates.js';

export default (sender, msg) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKTF ', ''), 10);

  if (!Number.isNaN(n) && n > 0) {
    log.userChat(sender.getSteamID64(), `[ !CHECKTF ${n} ]`);

    if (main.maxCheck.keys >= n) {
      if (n >= 1) {
        chatMessage(
          sender,
          messages.checkAmount.tf
            .replace(/{EVENTCARDS}/g, n * rates.buy.tf)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, n)
        );
      } else {
        chatMessage(sender, messages.error.inputinvalid.amountlow.keys);
      }
    } else {
      chatMessage(sender, messages.error.inputinvalid.amountover.keys);
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.keys.replace('{command}', '!CHECKTF 1')
    );
  }
};
