import chatMessage from '../../../components/chatMessage.js';
import { client } from '../../../components/client.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

const SID64REGEX = new RegExp(/^[0-9]{17}$/);

export default (sender, msg) => {
  const n = msg.toUpperCase().replace('!UNBLOCK ', '').toString();

  log.adminChat(sender.getSteamID64(), `[ !UNBLOCK ${n} ]`);
  if (SID64REGEX.test(n)) {
    if (n !== sender.getSteamID64()) {
      client.unblockUser(n, (err) => {
        if (err) {
          chatMessage(sender, messages.unblock.error);
          log.error(`An error occured while unblocking user: ${err}`);
        } else {
          chatMessage(sender, messages.unblock.response);
        }
      });
    } else {
      chatMessage(sender, messages.unblock.notallowed);
    }
  } else {
    chatMessage(sender, messages.error.inputinvalid.steamid64);
  }
};
