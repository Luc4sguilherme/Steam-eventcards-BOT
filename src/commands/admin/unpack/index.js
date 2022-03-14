import chatMessage from '../../../components/chatMessage.js';
import { community, manager } from '../../../components/client.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.adminChat(sender.getSteamID64(), '[ !UNPACK ]');
  manager.getInventoryContents(753, 6, false, (error1, inv) => {
    if (!error1) {
      const botBooster = [];
      let itemid;
      let appid;

      for (let i = 0; i < inv.length; i += 1) {
        if (inv[i].type === 'Booster Pack') {
          botBooster.push(inv[i]);
          appid = inv[i].market_fee_app;
          itemid = inv[i].id;
          community.openBoosterPack(appid, itemid, (error2) => {
            if (error2) {
              log.error(
                `An error occurred while getting unpack Booster: ${error2}`
              );
            }
          });
        }
      }

      if (botBooster.length > 0) {
        chatMessage(
          sender,
          messages.unpack.replace('{BOOSTER}', botBooster.length)
        );
      } else {
        chatMessage(sender, messages.error.unpack);
      }
    } else {
      chatMessage(sender, messages.error.loadinventory.me);
      log.error(
        sender.getSteamID64(),
        `An error occurred while getting inventory: ${error1}`
      );
    }
  });
};
