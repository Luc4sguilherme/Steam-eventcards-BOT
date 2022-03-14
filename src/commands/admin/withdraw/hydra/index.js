import log from '../../../../components/log.js';
import chatMessage from '../../../../components/chatMessage.js';
import currencies from '../../../../config/currencies.js';
import { manager } from '../../../../components/client.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!WITHDRAWHYDRA') ||
    input.match('!HYDRAWITHDRAW') ||
    input.match('!HYWD') ||
    [];
  const amountkeys = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountkeys) && amountkeys > 0) {
    log.adminChat(sender.getSteamID64(), `[ !WITHDRAWHYDRA ${amountkeys} ]`);
    chatMessage(sender, messages.request);

    manager.getInventoryContents(730, 2, true, (error1, inv) => {
      if (error1) {
        chatMessage(sender, messages.error.loadinventory.me);
        log.error(`An error occurred while getting inventory: ${error1}`);
      } else {
        let botkeys = 0;
        let added = 0;
        const myKeys = [];

        for (let i = 0; i < inv.length; i += 1) {
          if (currencies.hydra.indexOf(inv[i].market_hash_name) >= 0) {
            botkeys += 1;
            if (added < amountkeys) {
              myKeys.push(inv[i]);
              added += 1;
            }
          }
        }
        if (botkeys < amountkeys) {
          chatMessage(
            sender,
            messages.error.outofstock.admin.keys.me.replace('{KEYS}', botkeys)
          );
        } else {
          const message = messages.trade.message.hydra[0].replace(
            '{KEYS}',
            amountkeys
          );

          makeOffer(
            sender.getSteamID64(),
            myKeys,
            [],
            '!WITHDRAWHYDRA',
            message,
            0,
            amountkeys,
            0
          );
        }
      }
    });
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.keys.replace('{command}', `${command} 1`)
    );
  }
};
