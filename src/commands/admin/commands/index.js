import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.adminChat(sender.getSteamID64(), '[ !COMMANDS ]');

  const msg = messages.adminCommands;

  let message = '/pre ';
  for (let i = 0; i < msg.length; i += 1) {
    message += msg[i];
  }

  chatMessage(sender, message.replace(/{EVENTNAME}/g, main.eventName));
};
