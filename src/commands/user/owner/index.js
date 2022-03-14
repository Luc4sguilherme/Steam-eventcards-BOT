import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !OWNER ]');
  chatMessage(sender, main.owner);
};
