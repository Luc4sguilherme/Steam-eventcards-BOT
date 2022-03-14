import chatMessage from '../components/chatMessage.js';
import main from '../config/main.js';
import messages from '../config/messages.js';
import admin from './admin/index.js';
import user from './user/index.js';

export default (sender, msg) => {
  if (main.admins.includes(sender.getSteamID64())) {
    if (admin(sender, msg) === 'unknow' && user(sender, msg) === 'unknow') {
      chatMessage(sender, messages.error.unknowAdminCommand);
    }
  } else if (user(sender, msg) === 'unknow') {
    chatMessage(sender, messages.error.unknowCommand);
  }
};
