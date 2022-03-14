import colour from 'cli-color';
import moment from 'moment';
import fs from 'graceful-fs';

import main from '../config/main.js';
import persistToDisk from './persistToDisk.js';
import { getOfferItemInfo } from './utils.js';

const log = {};

log.warn = (data) => {
  if (main.log.warn) {
    const text = `${moment().format(
      'MM/DD/YYYY - HH:mm:ss,SSS ZZ'
    )} @ [ WARN ] ${data}`;

    console.log(colour.yellowBright(text));

    persistToDisk(
      `./log/warn/log-${moment().format('MM-DD-YYYY')}`,
      text,
      'txt',
      'append'
    ).catch((error) => {
      log.error(error);
    });
  }
};

log.error = (data) => {
  if (main.log.error) {
    const text = `${moment().format(
      'MM/DD/YYYY - HH:mm:ss,SSS ZZ'
    )} @ [ ERROR ] ${data}`;

    console.log(colour.redBright(text));

    persistToDisk(
      `./log/error/log-${moment().format('MM-DD-YYYY')}`,
      text,
      'txt',
      'append'
    ).catch((error) => {
      console.error(error);
    });
  }
};

log.info = (data) => {
  if (main.log.info) {
    const text = `${moment().format(
      'MM/DD/YYYY - HH:mm:ss,SSS ZZ'
    )} @ [ INFO ] ${data}`;

    console.log(colour.greenBright(text));

    persistToDisk(
      `./log/info/log-${moment().format('MM-DD-YYYY')}`,
      text,
      'txt',
      'append'
    ).catch((error) => {
      log.error(error);
    });
  }
};

log.userChat = (id64, data) => {
  if (main.log.userChat) {
    const text = `${moment().format(
      'MM/DD/YYYY - HH:mm:ss,SSS ZZ'
    )} @ [ USERCHAT ][ ${id64} ] ${data}`;

    console.log(colour.whiteBright(text));

    persistToDisk(
      `./log/userChat/log-${moment().format('MM-DD-YYYY')}`,
      text,
      'txt',
      'append'
    ).catch((error) => {
      log.error(error);
    });
  }
};

log.adminChat = (id64, data) => {
  if (main.log.adminChat) {
    const text = `${moment().format(
      'MM/DD/YYYY - HH:mm:ss,SSS ZZ'
    )} @ [ ADMINCHAT ][ ${id64} ] ${data}`;

    console.log(colour.blackBright(text));

    persistToDisk(
      `./log/adminChat/log-${moment().format('MM-DD-YYYY')}`,
      text,
      'txt',
      'append'
    ).catch((error) => {
      log.error(error);
    });
  }
};

log.tradeoffer = (data) => {
  if (main.log.tradeOffer) {
    const text = `${moment().format(
      'MM/DD/YYYY - HH:mm:ss,SSS ZZ'
    )} @ [ TRADEOFFER ] ${data}`;

    console.log(colour.blueBright(text));

    persistToDisk(
      `./log/tradeOffer/log-${moment().format('MM-DD-YYYY')}`,
      text,
      'txt',
      'append'
    ).catch((error) => {
      log.error(error);
    });
  }
};

log.tradesHistory = (offer) => {
  const itemsSent = offer.itemsToGive.map(getOfferItemInfo);
  const itemsReceived = offer.itemsToReceive.map(getOfferItemInfo);

  let data = `Command: ${offer.data('commandused')}`;

  if (offer.data('amountofeventcards')) {
    data += `\nEventCards: ${offer.data('amountofeventcards')}`;
  }
  if (offer.data('amountofkeys')) {
    data += `\nKeys: ${offer.data('amountofkeys')}`;
  }
  if (offer.data('amountofgems')) {
    data += `\nGems: ${offer.data('amountofgems')}`;
  }

  data += `\nSteamID: ${offer.partner.getSteamID64()}`;
  data += `\nOfferID: ${offer.id}`;
  data += `\nCreatedDate: ${moment(offer.created).toISOString()}`;
  data += `\nCompletedDate: ${moment(offer.updated).toISOString()}`;
  data += `\nItemsSent: ${JSON.stringify(itemsSent, null, 2)}`;
  data += `\nItemsReceived: ${JSON.stringify(itemsReceived, null, 2)}`;

  fs.writeFile(
    `./log/acceptedTrades/${offer.id}-${offer.partner.getSteamID64()}.txt`,
    data,
    (error) => {
      if (error) {
        log.error(`An error occurred while writing trade file: ${error}`);
      }
    }
  );
};

export default log;
