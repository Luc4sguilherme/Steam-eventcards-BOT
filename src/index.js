/* eslint-disable no-process-exit */
import moment from 'moment';
import SteamTotp from 'steam-totp';
import SteamUser from 'steam-user';

import { client, community, manager } from './components/client.js';
import { loadInventory, updateStock } from './components/inventory.js';
import log from './components/log.js';
import commands from './commands/index.js';
import config from './config/main.js';
import messages from './config/messages.js';
import chatMessage from './components/chatMessage.js';
import notifyAdmin from './components/notifyAdmin.js';
import { playLoading } from './components/utils.js';

client.logOn({
  accountName: config.userName,
  password: config.passWord,
  twoFactorCode: SteamTotp.getAuthCode(config.sharedSecret),
  identity_secret: config.identitySecret,
  rememberPassword: true,
  shared_secret: config.sharedSecret,
});

client.on('loggedOn', () => {
  if (config.botName) {
    client.setPersona(SteamUser.EPersonaState.Online, config.botName);
  } else {
    client.setPersona(SteamUser.EPersonaState.Online);
  }
});

client.on('webSession', async (value, cookies) => {
  manager.setCookies(cookies, (error) => {
    if (error) {
      log.error('An error occurred while setting cookies.');
    } else {
      log.info('Websession created and cookies set.');
    }
  });

  community.setCookies(cookies);
  community.startConfirmationChecker(
    moment.duration(20, 'seconds'),
    config.identitySecret
  );

  const load = ['GEMS', 'CSGO', 'EVENTCARDS', 'TF2', 'SETS', 'HYDRA'];

  await loadInventory(load);
});

community.on('sessionExpired', (error) => {
  if (error) {
    log.error(error);
  }

  client.webLogOn();
});

client.on('error', (error) => {
  const minutes = 25;
  const seconds = 5;

  switch (error.eresult) {
    case SteamUser.EResult.AccountDisabled:
      log.error(`This account is disabled!`);
      break;
    case SteamUser.EResult.InvalidPassword:
      log.error(`Invalid Password detected!`);
      break;
    case SteamUser.EResult.RateLimitExceeded:
      log.warn(
        `Rate Limit Exceeded, trying to login again in ${minutes} minutes.`
      );
      setTimeout(() => {
        client.relog();
      }, moment.duration(minutes, 'minutes'));
      break;
    case SteamUser.EResult.LogonSessionReplaced:
      log.warn(
        `Unexpected Disconnection!, you have LoggedIn with this same account in another place. Trying to login again in ${seconds} seconds.`
      );
      setTimeout(() => {
        client.relog();
      }, moment.duration(seconds, 'seconds'));
      break;
    default:
      log.warn(
        `Unexpected Disconnection!, trying to login again in ${seconds} seconds.`
      );
      setTimeout(() => {
        client.relog();
      }, moment.duration(seconds, 'seconds'));
      break;
  }
});

client.on('newItems', (count) => {
  log.info(`We have ${count} new Items in our Inventory`);
});

client.on('emailInfo', (address) => {
  log.info(`E-Mail: ${address}`);
});

client.on(
  'accountLimitations',
  (limited, communityBanned, locked, canInviteFriends) => {
    if (limited) {
      log.info(
        'Account is limited. Cannot send friend invites, use the market, open group chat, or access the web API.'
      );
      client.logOff();
    }
    if (communityBanned) {
      log.info('Account is banned from Steam Community');
      client.logOff();
    }
    if (locked) {
      log.info(
        'Account is locked. We cannot trade/gift/purchase items, play on VAC servers, or access Steam Community.  Shutting down.'
      );
      client.logOff();
      process.exit(1);
    }
    if (!canInviteFriends) {
      log.info('Account is unable to send friend requests.');
      client.logOff();
    }
  }
);

client.on('wallet', (hasWallet, currency, balance) => {
  if (hasWallet) {
    log.info(
      `Wallet: ${SteamUser.formatCurrency(
        balance,
        currency
      )} Steam Credit remaining`
    );
  } else {
    log.info('We do not have a Steam wallet.');
  }
});

client.on('friendMessage', (sender, msg) => {
  if (client.myFriends[sender.getSteamID64()] === 5) {
    chatMessage(sender, 'You have been banned from using our services');
  } else if (client.myFriends[sender.getSteamID64()] === undefined) {
    chatMessage(sender, 'You need to add me as a friend');
  } else if (msg.indexOf('[/tradeoffer]') >= 0) {
    chatMessage(sender, messages.request);
  } else if (
    playLoading.loading &&
    (msg.toUpperCase().search(/BUY/) !== -1 ||
      msg.toUpperCase().search(/SELL/) !== -1 ||
      msg.toUpperCase().search(/STOCK|STAT|STATU|STATUS|STATS/) !== -1 ||
      msg.toUpperCase().search(/CHECK/) !== -1 ||
      msg.toUpperCase().search(/WITHDRAW|WD/) !== -1 ||
      msg.toUpperCase().search(/DEPOSIT|DP/) !== -1 ||
      msg.toUpperCase().search(/RELOAD/) !== -1 ||
      msg.toUpperCase().search(/UNPACK/) !== -1)
  ) {
    chatMessage(sender, messages.loading);
  } else {
    commands(sender, msg);
  }
});

client.on('friendRelationship', (sender, rel) => {
  if (rel === 3) {
    chatMessage(sender, messages.welcome);
  } else if (rel === 2) {
    client.addFriend(sender, (err, name) => {
      if (err) {
        log.error(`Error trying to add ${sender.getSteamID64()} Reason:${err}`);
      } else if (name) {
        log.info(`Succesfully added ${sender.getSteamID64()} to friendlist.`);
      }
    });
  } else if (rel === 0) {
    log.info(
      `User ID: ${sender.getSteamID64()} has deleted us from their friendlist.`
    );
  }
});

manager.on('newOffer', (offer) => {
  if (offer.state === 2) {
    if (config.admins.includes(offer.partner.getSteamID64())) {
      offer.accept((error1) => {
        if (error1) {
          log.error(`An error occurred while accepting trade: ${error1}`);
          offer.decline((error2) => {
            if (error2) {
              log.error(`An error occurred while accepting trade: ${error2}`);
            }
          });
        } else {
          chatMessage(offer.partner, messages.trade.accepted);
        }
      });
    } else {
      offer.decline((error) => {
        if (error) {
          log.error(`An error occurred while declining trade: ${error}`);
        } else {
          log.tradeoffer(`Trade offer canceled. TradeID:${offer.id}`);
          chatMessage(
            offer.partner,
            messages.trade.declined.us.replace('{OFFERID}', offer.id)
          );
        }
      });
    }
  }
});

manager.on('sentOfferChanged', async (offer) => {
  if (offer.state === 2) {
    log.tradeoffer(
      `Tradeoffer has been confirmed and is awaiting confirmation from User. TradeID:${offer.id}`
    );
  } else if (offer.state === 3) {
    log.tradeoffer(`Tradeoffer has been completed. TradeID:${offer.id}`);

    // Update stock
    updateStock(offer);

    chatMessage(offer.partner.getSteamID64(), messages.trade.done);

    if (!config.admins.includes(offer.partner.getSteamID64())) {
      notifyAdmin(offer);
    }

    log.tradesHistory(offer);
  } else if (offer.state === 4) {
    chatMessage(
      offer.partner,
      messages.trade.counteroffer.replace('{OFFERID}', offer.id)
    );
    log.tradeoffer(`Aborted because of counter offer. TradeID:${offer.id}`);
  } else if (offer.state === 5) {
    chatMessage(
      offer.partner,
      messages.trade.expired.replace('{OFFERID}', offer.id)
    );
    log.tradeoffer(`Tradeoffer expired. TradeID:${offer.id}`);
  } else if (offer.state === 6) {
    chatMessage(
      offer.partner,
      messages.trade.canceled.replace('{OFFERID}', offer.id)
    );

    log.tradeoffer(
      `Trade offer canceled by Bot (expired). TradeID:${offer.id}`
    );
  } else if (offer.state === 7 || offer.state === 10) {
    chatMessage(
      offer.partner,
      messages.trade.declined.them.replace('{OFFERID}', offer.id)
    );
    log.tradeoffer(`Tradeoffer declined by User. TradeID:${offer.id}`);
  } else if (offer.state === 8) {
    chatMessage(
      offer.partner,
      messages.trade.declined.us.replace('{OFFERID}', offer.id)
    );
    log.tradeoffer(
      `Tradeoffer canceled by Bot (items unavailable). TradeID:${offer.id}`
    );
  } else if (offer.state === 11) {
    chatMessage(
      offer.partner,
      messages.trade.escrow.replace('{OFFERID}', offer.id)
    );
    log.tradeoffer(
      `Tradeoffer aborted because user is in escrow and can't trade. TradeID:${offer.id}`
    );
  }
});

community.on('newConfirmation', (conf) => {
  log.tradeoffer('New confirmation.');
  community.acceptConfirmationForObject(
    config.identitySecret,
    conf.id,
    (error) => {
      if (error) {
        log.error(`An error occurred while accepting confirmation: ${error}`);
      } else {
        log.tradeoffer('Confirmation accepted.');
      }
    }
  );
});
