import log from '../../../../components/log.js';
import currencies from '../../../../config/currencies.js';
import chatMessage from '../../../../components/chatMessage.js';
import { manager } from '../../../../components/client.js';
import messages from '../../../../config/messages.js';
import makeOffer from '../../../../components/makeOffer.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command =
    input.match('!WITHDRAWGEMS') ||
    input.match('!WITHDRAWGEM') ||
    input.match('!GEMSWITHDRAW') ||
    input.match('!GEMWITHDRAW') ||
    input.match('!GEWD') ||
    [];
  const amountgems = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountgems) && parseInt(amountgems, 10) > 0) {
    chatMessage(sender, messages.request);

    manager.getInventoryContents(753, 6, true, (error, INV) => {
      log.adminChat(sender.getSteamID64(), `[ !WITHDRAWGEMS ${amountgems} ]`);
      if (error) {
        chatMessage(sender, messages.error.loadinventory.me);
        log.error(`An error occurred while getting inventory: ${error}`);
      } else {
        let botgems = 0;
        const inv = INV;
        const myGems = [];
        let need = amountgems;
        for (let i = 0; i < inv.length; i += 1) {
          if (need !== 0) {
            if (currencies.gems.indexOf(inv[i].market_hash_name) >= 0) {
              inv[i].amount = need <= inv[i].amount ? need : inv[i].amount;
              need -= inv[i].amount;
              botgems += inv[i].amount;
              myGems.push(inv[i]);
            }
          } else {
            break;
          }
        }
        if (botgems < amountgems) {
          chatMessage(
            sender,
            messages.error.outofstock.admin.gems.me.replace('{GEMS}', botgems)
          );
        } else {
          const message = messages.trade.message.gems[0].replace(
            '{GEMS}',
            amountgems
          );

          makeOffer(
            sender.getSteamID64(),
            myGems,
            [],
            '!WITHDRAWGEMS',
            message,
            0,
            0,
            amountgems
          );
        }
      }
    });
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.gems.replace('{command}', `${command} 1`)
    );
  }
};
