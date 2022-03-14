import chatMessage from '../../../components/chatMessage.js';
import { manager } from '../../../components/client.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender, msg) => {
  const offerID = msg.substring('!CANCEL'.length).trim();

  if (offerID) {
    chatMessage(sender, messages.request);
    log.adminChat(sender.getSteamID64(), `[ !CANCEL ${offerID} ]`);

    manager.getOffer(offerID, (error1, offer) => {
      if (error1) {
        chatMessage(sender, messages.error.getoffer);
        log.error(`There was an error getting offers: ${error1}`);
      } else {
        offer.decline((error2) => {
          if (error2) {
            if (
              error2.message.indexOf(
                `Offer #${offerID} is not active, so it may not be cancelled or declined`
              ) > -1
            ) {
              chatMessage(
                sender,
                messages.error.nonexistentoffer.replace('{OFFERID}', offerID)
              );
            } else {
              chatMessage(sender, messages.error.canceloffer);
            }

            log.error(`An error occurred while declining trade: ${error2}`);
          }
        });
      }
    });
  } else {
    chatMessage(
      sender,
      messages.error.inputinvalid.offerid.replace(
        '{command}',
        '!CANCEL offerID'
      )
    );
  }
};
