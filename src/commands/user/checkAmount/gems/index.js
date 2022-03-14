import chatMessage from '../../../../components/chatMessage.js';
import log from '../../../../components/log.js';
import main from '../../../../config/main.js';
import messages from '../../../../config/messages.js';
import rates from '../../../../config/rates.js';

export default (sender, msg) => {
  const n = parseInt(msg.toUpperCase().replace('!CHECKGEMS ', ''), 10);

  if (!Number.isNaN(n) && n > 0) {
    log.userChat(sender.getSteamID64(), `[ !CHECKGEMS ${n} ]`);

    if (main.maxCheck.gems >= n) {
      if (n >= rates.buy.gems) {
        chatMessage(
          sender,
          messages.checkAmount.gems
            .replace(/{EVENTCARDS}/g, parseInt(n / rates.buy.gems, 10))
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{GEMS}/g, n)
        );
      } else {
        chatMessage(sender, messages.error.inputinvalid.amountlow.gems);
      }
    } else {
      chatMessage(sender, messages.error.inputinvalid.amountover.gems);
    }
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.gems.replace(
        '{command}',
        `!CHECKGEMS ${rates.buy.gems}`
      )
    );
  }
};
