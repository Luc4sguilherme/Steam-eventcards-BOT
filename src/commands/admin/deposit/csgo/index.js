import chatMessage from '../../../../components/chatMessage.js';
import currencies from '../../../../config/currencies.js';
import { manager } from '../../../../components/client.js';
import log from '../../../../components/log.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!DEPOSITCSGO') ||
    input.match('!DEPOSITCS') ||
    input.match('!CSGODEPOSIT') ||
    input.match('!CSDEPOSIT') ||
    input.match('!CSDP') ||
    [];
  const amountkeys = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountkeys) && amountkeys > 0) {
    log.adminChat(sender.getSteamID64(), `[ !DEPOSITCSGO ${amountkeys} ]`);
    chatMessage(sender, messages.request);

    manager.getUserInventoryContents(
      sender.getSteamID64(),
      730,
      2,
      true,
      (error, inv) => {
        if (!error) {
          const theirKeys = [];
          for (let i = 0; i < inv.length; i += 1) {
            if (
              theirKeys.length < amountkeys &&
              currencies.csgo.indexOf(inv[i].market_hash_name) >= 0
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
            const message = messages.trade.message.csgo[0].replace(
              '{KEYS}',
              amountkeys
            );

            makeOffer(
              sender.getSteamID64(),
              [],
              theirKeys,
              '!DEPOSITCSGO',
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
