import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';
import messages from '../../../config/messages.js';
import rates from '../../../config/rates.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !PRICES ]');
  chatMessage(
    sender,
    messages.prices
      .replace('{SETSSELL}', rates.sell.sets)
      .replace('{SETSBUY}', rates.buy.sets)
      .replace('{CSGOSELL}', rates.sell.csgo)
      .replace('{CSGOBUY}', rates.buy.csgo)
      .replace('{HYDRASELL}', rates.sell.hydra)
      .replace('{HYDRABUY}', rates.buy.hydra)
      .replace('{TFSELL}', rates.sell.tf)
      .replace('{TFBUY}', rates.buy.tf)
      .replace('{GEMSSELL}', rates.sell.gems)
      .replace('{GEMSBUY}', rates.buy.gems)
      .replace(/{EVENTNAME}/g, main.eventName)
  );
};
