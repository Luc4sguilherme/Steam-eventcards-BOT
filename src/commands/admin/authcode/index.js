import SteamTotp from 'steam-totp';

import main from '../../../config/main.js';
import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';

export default (sender) => {
  log.adminChat(sender.getSteamID64(), '[ !AUTHCODE ]');
  chatMessage(sender, `AUTHCODE: ${SteamTotp.getAuthCode(main.sharedSecret)}`);
};
