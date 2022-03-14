import log from '../../../../components/log.js';
import currencies from '../../../../config/currencies.js';
import chatMessage from '../../../../components/chatMessage.js';
import { manager } from '../../../../components/client.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!DEPOSITGEMS') ||
    input.match('!DEPOSITGEM') ||
    input.match('!GEMSDEPOSIT') ||
    input.match('!GEMDEPOSIT') ||
    input.match('!GEDP') ||
    [];
  const amountgems = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountgems) && amountgems > 0) {
    log.adminChat(sender.getSteamID64(), `[ !DEPOSITGEMS ${amountgems} ]`);

    chatMessage(sender, messages.request);

    manager.getUserInventoryContents(
      sender.getSteamID64(),
      753,
      6,
      true,
      (error, inv) => {
        if (!error) {
          let theirgems = 0;
          const INV = inv;
          const gems = [];
          let need = amountgems;
          for (let i = 0; i < inv.length; i += 1) {
            if (need !== 0) {
              if (currencies.gems.indexOf(INV[i].market_hash_name) >= 0) {
                INV[i].amount = need <= INV[i].amount ? need : INV[i].amount;
                need -= INV[i].amount;
                theirgems += INV[i].amount;
                gems.push(INV[i]);
              }
            } else {
              break;
            }
          }
          if (theirgems < amountgems) {
            chatMessage(
              sender,
              messages.error.outofstock.admin.gems.them.replace(
                '{GEMS}',
                theirgems
              )
            );
          } else {
            const message = messages.trade.message.gems[0].replace(
              '{GEMS}',
              amountgems
            );

            makeOffer(
              sender.getSteamID64(),
              [],
              gems,
              '!DEPOSITGEMS',
              message,
              0,
              0,
              0,
              amountgems
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
      messages.error.inputinvalid.gems.replace('{command}', `${command} 1`)
    );
  }
};
