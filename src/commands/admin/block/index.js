import chatMessage from '../../../components/chatMessage.js';
import { client } from '../../../components/client.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

const SID64REGEX = new RegExp(/^[0-9]{17}$/);

export default (sender, msg) => {
  const n = msg.toUpperCase().replace('!BLOCK ', '').toString();

  log.adminChat(sender.getSteamID64(), `[ !BLOCK ${n} ]`);
  if (SID64REGEX.test(n)) {
    if (n !== sender.getSteamID64()) {
      client.blockUser(n, (err) => {
        if (err) {
          chatMessage(sender, messages.block.error);
          log.error(`An error occured while blocking user: ${err}`);
        } else {
          chatMessage(sender, messages.block.response);
        }
      });
      client.removeFriend(n);
    } else {
      chatMessage(sender, messages.block.notallowed);
    }
  } else {
    chatMessage(sender, messages.error.inputinvalid.steamid64);
  }
};
