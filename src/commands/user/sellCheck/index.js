import chatMessage from '../../../components/chatMessage.js';
import { getEventCards } from '../../../components/inventory.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';
import messages from '../../../config/messages.js';
import rates from '../../../config/rates.js';

export default async (sender) => {
  chatMessage(sender, messages.request);
  log.userChat(sender.getSteamID64(), '[ !SELLCHECK ]');

  getEventCards(sender.getSteamID64(), async (error1, inv) => {
    if (!error1) {
      let amountCards = 0;

      for (let i = 0; i < inv.length; i += 1) {
        amountCards += 1;
      }

      if (amountCards) {
        const csgo = parseInt(amountCards / rates.sell.csgo, 10);
        const tf = parseInt(amountCards / rates.sell.tf, 10);
        const hydra = parseInt(amountCards / rates.sell.hydra, 10);
        const sets = parseInt(amountCards / rates.sell.sets, 10);
        const gems = amountCards * rates.sell.gems;

        let message = ' ';

        if (csgo > 0) {
          message += messages.sellCheck.currencies.csgo
            .replace('{CARDS}', csgo * rates.sell.csgo)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, csgo);
        }

        if (tf > 0) {
          message += messages.sellCheck.currencies.tf
            .replace('{CARDS}', tf * rates.sell.tf)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, tf);
        }

        if (hydra > 0) {
          message += messages.sellCheck.currencies.hydra
            .replace('{CARDS}', hydra * rates.sell.hydra)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{KEYS}/g, hydra);
        }

        if (gems > 0) {
          message += messages.sellCheck.currencies.gems
            .replace(/{CARDS}/g, amountCards)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{GEMS}/g, gems);
        }

        if (sets > 0) {
          message += messages.sellCheck.currencies.sets
            .replace(/{CARDS}/g, sets * rates.sell.sets)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace(/{SETS}/g, sets);
        }

        if (!message.includes('•')) {
          chatMessage(
            sender,
            messages.error.outofstock.common.eventCards.them.replace(
              /{EVENTNAME}/g,
              main.eventName
            )
          );
          return;
        }

        chatMessage(
          sender,
          messages.sellCheck.response
            .replace('{CARDS}', amountCards)
            .replace(/{EVENTNAME}/g, main.eventName)
            .replace('{MESSAGE}', message)
        );
      } else {
        chatMessage(
          sender,
          messages.error.outofstock.common.eventCards.them.replace(
            /{EVENTNAME}/g,
            main.eventName
          )
        );
      }
    } else if (error1.message.indexOf('profile is private') > -1) {
      chatMessage(sender, messages.error.privateinventory);
      log.error(`An error occurred while getting user inventory: ${error1}`);
    } else {
      chatMessage(sender, messages.error.loadinventory.them);
      log.error(`An error occurred while getting user inventory: ${error1}`);
    }
  });
};
