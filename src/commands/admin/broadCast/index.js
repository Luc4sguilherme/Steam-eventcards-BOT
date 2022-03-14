import chatMessage from '../../../components/chatMessage.js';
import { client } from '../../../components/client.js';
import log from '../../../components/log.js';
import { delay } from '../../../components/utils.js';
import messages from '../../../config/messages.js';

export default async (sender, msg) => {
  const n = msg.substring('!BROADCAST'.length).trim();
  if (n.length > 0) {
    log.adminChat(sender.getSteamID64(), `[ !BROADCAST ${n} ]`);
    for (let i = 0; i <= Object.keys(client.myFriends).length; i += 1) {
      if (Object.values(client.myFriends)[i] === 3) {
        chatMessage(Object.keys(client.myFriends)[i], `/pre ${n}`);
        await delay(200);
      }
    }
  } else {
    chatMessage(sender, messages.error.inputinvalid.message);
  }
};
