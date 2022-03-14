import { client } from './client.js';

const chatMessage = (id64, msg) => {
  client.chatMessage(id64, msg);
};

export default chatMessage;
