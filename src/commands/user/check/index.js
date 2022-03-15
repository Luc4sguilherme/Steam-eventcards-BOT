import chatMessage from '../../../components/chatMessage.js';
import { client } from '../../../components/client.js';
import { getEventCards } from '../../../components/inventory.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';
import messages from '../../../config/messages.js';
import rates from '../../../config/rates.js';

export default async (sender) => {
  chatMessage(sender, messages.request);
  log.userChat(sender.getSteamID64(), '[ !CHECK ]');

  getEventCards(client.steamID.getSteamID64(), async (error1, inv) => {
    if (!error1) {
      let amountCards = 0;

      for (let i = 0; i < inv.length; i += 1) {
        amountCards += 1;
      }

      if (amountCards) {
        const csgo = parseInt(amountCards / rates.buy.csgo, 10);
        const tf = parseInt(amountCards / rates.buy.tf, 10);
        const hydra = parseInt(amountCards / rates.buy.hydra, 10);
        const gems = amountCards * rates.buy.gems;

        let message = ' ';

        if (csgo > 0) {
          message += messages.check.currencies.csgo
            .replace('{CARDS}', csgo * rates.buy.csgo)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, csgo);
        }

        if (tf > 0) {
          message += messages.check.currencies.tf
            .replace('{CARDS}', tf * rates.buy.tf)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, tf);
        }

        if (hydra > 0) {
          message += messages.check.currencies.hydra
            .replace('{CARDS}', hydra * rates.buy.hydra)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, hydra);
        }

        if (gems > 0) {
          message += messages.check.currencies.gems
            .replace(/{CARDS}/g, amountCards)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{GEMS}/g, gems);
        }

        if (!message.includes('•')) {
          chatMessage(
            sender,
            messages.error.outofstock.common.eventCards.me.replace(
              /{EVENTNAME}/g,
              main.eventName
            )
          );
          return;
        }

        chatMessage(
          sender,
          messages.check.response
            .replace('{CARDS}', amountCards)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace('{MESSAGE}', message)
        );
      } else {
        chatMessage(
          sender,
          messages.error.outofstock.common.eventCards.me.replace(
            /{EVENTNAME}/g,
            main.eventName
          )
        );
      }
    } else {
      chatMessage(sender, messages.error.loadinventory.me);
      log.error(`An error occurred while getting user inventory: ${error1}`);
    }
  });
};
