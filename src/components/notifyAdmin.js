import main from '../config/main.js';
import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';

export default (offer) => {
  let msg = '';

  if (offer.data('commandused').search(/BUY/) !== -1) {
    if (offer.data('commandused').search(/CSGO/) !== -1) {
      msg += messages.trade.notificationToAdmin.buy
        .replace('{CURRENCY}', `${offer.data('amountofkeys')} CS:GO key(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/HYDRA/) !== -1) {
      msg += messages.trade.notificationToAdmin.buy
        .replace('{CURRENCY}', `${offer.data('amountofkeys')} hydra key(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/TF/) !== -1) {
      msg += messages.trade.notificationToAdmin.buy
        .replace('{CURRENCY}', `${offer.data('amountofkeys')} tf2 key(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/GEMS/) !== -1) {
      msg += messages.trade.notificationToAdmin.buy
        .replace('{CURRENCY}', `${offer.data('amountofgems')} gem(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/SETS/) !== -1) {
      msg += messages.trade.notificationToAdmin.buy
        .replace('{CURRENCY}', `${offer.data('amountofsets')} cards set(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
  }

  if (offer.data('commandused').search(/SELL/) !== -1) {
    if (offer.data('commandused').search(/CSGO/) !== -1) {
      msg += messages.trade.notificationToAdmin.sell
        .replace('{CURRENCY}', `${offer.data('amountofkeys')} CS:GO key(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/HYDRA/) !== -1) {
      msg += messages.trade.notificationToAdmin.sell
        .replace('{CURRENCY}', `${offer.data('amountofkeys')} hydra key(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/TF/) !== -1) {
      msg += messages.trade.notificationToAdmin.sell
        .replace('{CURRENCY}', `${offer.data('amountofkeys')} tf2 key(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/GEMS/) !== -1) {
      msg += messages.trade.notificationToAdmin.sell
        .replace('{CURRENCY}', `${offer.data('amountofgems')} gem(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
    if (offer.data('commandused').search(/SETS/) !== -1) {
      msg += messages.trade.notificationToAdmin.sell
        .replace('{CURRENCY}', `${offer.data('amountofsets')} cards set(s)`)
        .replace('{EVENTCARDS}', offer.data('amountofeventcards'))
        .replace(/{EVENTNAME}/g, main.eventName)
        .replace('{OFFERID}', offer.id);
    }
  }

  for (let j = 0; j < main.admins.length; j += 1) {
    chatMessage(main.admins[j], msg);
    chatMessage(
      main.admins[j],
      `https://steamcommunity.com/profiles/${offer.partner.getSteamID64()}`
    );
  }
};
