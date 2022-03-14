import chatMessage from '../../../../components/chatMessage.js';
import makeOffer from '../../../../components/makeOffer.js';
import log from '../../../../components/log.js';
import messages from '../../../../config/messages.js';
import { manager } from '../../../../components/client.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command = input.match('!DEPOSITBOOSTER') || input.match('!BODP') || [];
  const amountbooster = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountbooster) && amountbooster > 0) {
    log.adminChat(
      sender.getSteamID64(),
      `[ !DEPOSITBOOSTER ${amountbooster} ]`
    );
    chatMessage(sender, messages.request);
    manager.getUserInventoryContents(
      sender.getSteamID64(),
      753,
      6,
      true,
      (error, inv) => {
        if (!error) {
          const theirbooster = [];
          for (let i = 0; i < inv.length; i += 1) {
            if (
              theirbooster.length < amountbooster &&
              inv[i].type === 'Booster Pack'
            ) {
              theirbooster.push(inv[i]);
            }
          }

          if (theirbooster.length < amountbooster) {
            chatMessage(
              sender,
              messages.error.outofstock.admin.booster.them.replace(
                '{BOOSTER}',
                theirbooster.length
              )
            );
          } else {
            const message = messages.trade.message.booster.replace(
              '{BOOSTER}',
              amountbooster.toString()
            );

            makeOffer(
              sender.getSteamID64(),
              [],
              theirbooster,
              '!DEPOSITBOOSTER',
              message,
              0,
              0,
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
      }
    );
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.booster.replace('{command}', `${command} 1`)
    );
  }
};
