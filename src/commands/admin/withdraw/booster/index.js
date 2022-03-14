import chatMessage from '../../../../components/chatMessage.js';
import makeOffer from '../../../../components/makeOffer.js';
import log from '../../../../components/log.js';
import messages from '../../../../config/messages.js';
import { manager } from '../../../../components/client.js';

export default (sender, msg) => {
  const input = msg.toUpperCase();
  const command = input.match('!WITHDRAWBOOSTER') || input.match('!BOWD') || [];
  const amountbooster = parseInt(input.replace(`${command[0]} `, ''), 10);

  if (!Number.isNaN(amountbooster) && parseInt(amountbooster, 10) > 0) {
    log.adminChat(
      sender.getSteamID64(),

      `[ !WITHDRAWBOOSTER ${amountbooster} ]`
    );
    chatMessage(sender, messages.request);
    manager.getInventoryContents(753, 6, true, (error, inv) => {
      if (!error) {
        const botBooster = [];
        for (let i = 0; i < inv.length; i += 1) {
          if (
            botBooster.length < amountbooster &&
            inv[i].type === 'Booster Pack'
          ) {
            botBooster.push(inv[i]);
          }
        }

        if (botBooster.length < amountbooster) {
          chatMessage(
            sender,
            messages.error.outofstock.admin.booster.me.replace(
              '{BOOSTER}',
              botBooster.length
            )
          );
        } else {
          const message = messages.trade.message.booster.replace(
            '{BOOSTER}',
            amountbooster.toString()
          );

          makeOffer(
            sender.getSteamID64(),
            botBooster,
            [],
            '!WITHDRAWBOOSTER',
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
    });
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.booster.replace('{command}', `${command} 1`)
    );
  }
};
