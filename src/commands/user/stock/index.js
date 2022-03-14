import chatMessage from '../../../components/chatMessage.js';
import { stock } from '../../../components/inventory.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.adminChat(sender.getSteamID64(), '[ !STOCK ]');
  chatMessage(sender, messages.request);

  chatMessage(
    sender,
    messages.stock
      .replace('{TOTALBOTSETS}', stock.totalBotSets)
      .replace('{VARIETYOFGAMES}', stock.varietyOfGames)
      .replace(/{EVENTNAME}/g, main.eventName)
      .replace('{EVENTCARDS}', stock.botEventCards.length)
      .replace('{CSKEYSTRADABLE}', stock.csgo.tradable)
      .replace('{HYDRAKEYSTRADABLE}', stock.hydra.tradable)
      .replace('{TFKEYSTRADABLE}', stock.tf.tradable)
      .replace('{GEMSQUANTITYTRADABLE}', stock.gems.tradable)
      .replace('{CSKEYSNOTRADABLE}', stock.csgo.notradable)
      .replace('{HYDRAKEYSNOTRADABLE}', stock.hydra.notradable)
      .replace('{TFKEYSNOTRADABLE}', stock.tf.notradable)
      .replace('{GEMSQUANTITYNOTRADABLE}', stock.gems.notradable)
  );
};
