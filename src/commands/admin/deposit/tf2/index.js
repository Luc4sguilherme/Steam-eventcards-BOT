import log from '../../../../components/log.js';
import chatMessage from '../../../../components/chatMessage.js';
import currencies from '../../../../config/currencies.js';
import { manager } from '../../../../components/client.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!DEPOSITTF2') ||
    input.match('!DEPOSITTF') ||
    input.match('!TF2DEPOSIT') ||
    input.match('!TFDEPOSIT') ||
    input.match('!TFDP') ||
    [];
  const amountkeys = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountkeys) && amountkeys > 0) {
    log.adminChat(sender.getSteamID64(), `[ !DEPOSITTF ${amountkeys} ]`);

    chatMessage(sender, messages.request);
    manager.getUserInventoryContents(
      sender.getSteamID64(),
      440,
      2,
      true,
      (error, inv) => {
        if (!error) {
          const theirKeys = [];
          for (let i = 0; i < inv.length; i += 1) {
            if (
              theirKeys.length < amountkeys &&
              currencies.tf.indexOf(inv[i].market_hash_name) >= 0
            ) {
              theirKeys.push(inv[i]);
            }
          }
          if (theirKeys.length < amountkeys) {
            chatMessage(
              sender,
              messages.error.outofstock.admin.keys.them.replace(
                '{KEYS}',
                theirKeys.length
              )
            );
          } else {
            const message = messages.trade.message.tf[0].replace(
              '{KEYS}',
              amountkeys
            );

            makeOffer(
              sender.getSteamID64(),
              [],
              theirKeys,
              '!DEPOSITTF',
              message,
              0,
              amountkeys,
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
      }
    );
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.keys.replace('{command}', `${command} 1`)
    );
  }
};
