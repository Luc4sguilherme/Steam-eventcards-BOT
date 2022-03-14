import TradeOfferManager from 'steam-tradeoffer-manager';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
import moment from 'moment';

export const client = new SteamUser();
export const community = new SteamCommunity();
export const manager = new TradeOfferManager({
  steam: client,
  community,
  language: 'en',
  pollInterval: moment.duration(20, 'seconds'),
  cancelTime: moment.duration(2, 'hours'),
  savePollData: true,
});
