/* eslint-disable no-shadow */
/* eslint-disable consistent-return */

import moment from 'moment';
import async from 'async';

import log from './log.js';
import {
  delay,
  getCardsInSets,
  getSets,
  playStock,
  playLoading,
  getBadges,
} from './utils.js';
import { client, community } from './client.js';
import main from '../config/main.js';
import currencies from '../config/currencies.js';

export const stock = {
  totalBotSets: 0,
  botSets: {},
  varietyOfGames: 0,
  botEventCards: [],
  csgo: {
    tradable: 0,
    notradable: 0,
  },
  tf: {
    tradable: 0,
    notradable: 0,
  },
  hydra: {
    tradable: 0,
    notradable: 0,
  },
  gems: {
    tradable: 0,
    notradable: 0,
  },
};

export const getInventory = (sid, callback) => {
  community.getUserInventoryContents(sid, 753, 6, true, (error, inv) => {
    if (error) {
      callback(error);
    } else {
      let newInv = inv.filter(
        (item) => item.getTag('item_class').internal_name === 'item_class_2'
      );

      newInv = newInv.filter(
        (item) => item.getTag('cardborder').internal_name === 'cardborder_0'
      );

      newInv = newInv.filter((item) => !item.getTag('Event'));

      callback(null, newInv);
    }
  });
};

export const getEventCards = (sid, callback) => {
  community.getUserInventoryContents(sid, 753, 6, true, (error, inv) => {
    if (error) {
      callback(error);
    } else {
      let newInv = inv.filter(
        (item) => item.getTag('item_class').internal_name === 'item_class_2'
      );

      newInv = newInv.filter(
        (item) => item.getTag('cardborder').internal_name === 'cardborder_0'
      );

      newInv = newInv.filter((item) => item.market_fee_app === main.eventAppID);

      callback(null, newInv);
    }
  });
};

export const loadEventCards = (sid) =>
  new Promise((resolve, reject) => {
    getEventCards(sid, (error, data) => {
      if (!error) {
        let eventCards = 0;
        for (let i = 0; i < data.length; i += 1) {
          eventCards += 1;
        }

        stock.botEventCards = data;
        log.info(`Bot's ${main.eventName} cards loaded: ${eventCards}`);
        resolve();
      } else {
        reject(
          new Error(`An error occurred while getting bot inventory: ${error}`)
        );
      }
    });
  });

export const loadCSGO = (sid) =>
  new Promise((resolve, reject) => {
    community.getUserInventoryContents(sid, 730, 2, false, (error, inv) => {
      if (!error) {
        stock.csgo.tradable = 0;
        stock.csgo.notradable = 0;
        for (let i = 0; i < inv.length; i += 1) {
          if (currencies.csgo.includes(inv[i].market_hash_name)) {
            if (inv[i].tradable) {
              stock.csgo.tradable += 1;
            } else {
              stock.csgo.notradable += 1;
            }
          }
        }
        log.info(
          `Bot's CSGO loaded: ${stock.csgo.tradable} tradable, ${stock.csgo.notradable} notradable.`
        );
        resolve();
      } else {
        reject(
          new Error(
            `An error occurred while getting bot CSGO inventory: ${error}`
          )
        );
      }
    });
  });

export const loadHYDRA = (sid) =>
  new Promise((resolve, reject) => {
    community.getUserInventoryContents(sid, 730, 2, false, (error, inv) => {
      if (!error) {
        stock.hydra.tradable = 0;
        stock.hydra.notradable = 0;
        for (let i = 0; i < inv.length; i += 1) {
          if (currencies.hydra.includes(inv[i].market_hash_name)) {
            if (inv[i].tradable) {
              stock.hydra.tradable += 1;
            } else {
              stock.hydra.notradable += 1;
            }
          }
        }
        log.info(
          `Bot's Hydra loaded: ${stock.hydra.tradable} tradable, ${stock.hydra.notradable} notradable.`
        );
        resolve();
      } else {
        reject(
          new Error(
            `An error occurred while getting bot HYDRA inventory: ${error}`
          )
        );
      }
    });
  });

export const loadTF = (sid) =>
  new Promise((resolve, reject) => {
    community.getUserInventoryContents(sid, 440, 2, false, (error, inv) => {
      if (!error) {
        stock.tf.tradable = 0;
        stock.tf.notradable = 0;
        for (let i = 0; i < inv.length; i += 1) {
          if (currencies.tf.includes(inv[i].market_hash_name)) {
            if (inv[i].tradable) {
              stock.tf.tradable += 1;
            } else {
              stock.tf.notradable += 1;
            }
          }
        }
        log.info(
          `Bot's TF2 loaded: ${stock.tf.tradable} tradable, ${stock.tf.notradable} notradable.`
        );
        resolve();
      } else {
        reject(
          new Error(
            `An error occurred while getting bot TF2 inventory: ${error}`
          )
        );
      }
    });
  });

export const loadGEMS = (sid) =>
  new Promise((resolve, reject) => {
    community.getUserInventoryContents(sid, 753, 6, false, (error, inv) => {
      if (!error) {
        stock.gems.tradable = 0;
        stock.gems.notradable = 0;

        for (let i = 0; i < inv.length; i += 1) {
          if (currencies.gems.includes(inv[i].market_hash_name)) {
            if (inv[i].tradable) {
              stock.gems.tradable += inv[i].amount;
            } else {
              stock.gems.notradable += inv[i].amount;
            }
          }
        }
        log.info(
          `Bot's Gems loaded: ${stock.gems.tradable} tradable, ${stock.gems.notradable} notradable.`
        );
        resolve();
      } else {
        reject(
          new Error(
            `An error occurred while getting bot Gems inventory: ${error}`
          )
        );
      }
    });
  });

export const loadSETS = (sid) =>
  new Promise((resolve, reject) => {
    getInventory(sid, (error1, data1) => {
      if (!error1) {
        const allCards = getCardsInSets();
        const data2 = getSets(data1, allCards);

        let sets = 0;
        for (let i = 0; i < Object.keys(data2).length; i += 1) {
          sets += data2[Object.keys(data2)[i]].length;
        }

        stock.botSets = data2;
        stock.totalBotSets = sets;
        stock.varietyOfGames = Object.keys(data2).length;

        log.info(`Bot's Sets loaded: ${stock.totalBotSets}`);
        resolve();
      } else {
        reject(
          new Error(`An error occurred while getting bot inventory: ${error1}`)
        );
      }
    });
  });

export const loadInventory = async (load) => {
  const startedTime = Date.now();
  const LoadInventories = [];
  playLoading.resetTimer();
  playLoading.startTimer();

  const sid = client.steamID.getSteamID64();
  const Inventory = {
    GEMS: async () => {
      try {
        await delay(3000);
        await loadGEMS(sid);
      } catch (error) {
        log.error(error);

        return setTimeout(() => {
          Inventory.GEMS();
        }, moment.duration(5, 'seconds'));
      }
    },
    CSGO: async () => {
      try {
        await loadCSGO(sid);
      } catch (error) {
        log.error(error);

        return setTimeout(() => {
          Inventory.CSGO();
        }, moment.duration(5, 'seconds'));
      }
    },
    EVENTCARDS: async () => {
      try {
        await delay(3000);
        await loadEventCards(sid);
      } catch (error) {
        log.error(error);

        return setTimeout(() => {
          Inventory.EVENTCARDS();
        }, moment.duration(5, 'seconds'));
      }
    },
    HYDRA: async () => {
      try {
        await loadHYDRA(sid);
      } catch (error) {
        log.error(error);

        return setTimeout(() => {
          Inventory.HYDRA();
        }, moment.duration(5, 'seconds'));
      }
    },
    TF2: async () => {
      try {
        await loadTF(sid);
      } catch (error) {
        log.error(error);

        return setTimeout(() => {
          Inventory.TF2();
        }, moment.duration(5, 'seconds'));
      }
    },
    SETS: async () => {
      try {
        await delay(3000);
        await loadSETS(sid);
      } catch (error) {
        log.error(error);

        return setTimeout(() => {
          Inventory.SETS();
        }, moment.duration(5, 'seconds'));
      }
    },
  };

  for (let i = 0; i < load.length; i += 1) {
    LoadInventories.push(Inventory[load[i]]);
  }

  await async.series(LoadInventories);
  playLoading.resetTimer();
  playStock(stock);

  log.warn(
    `Inventory loaded in ${moment().diff(
      startedTime,
      'seconds',
      true
    )} seconds!`
  );
};

export const updateStock = async (offer) => {
  const load = [];

  function add(param) {
    load.push(param);
  }

  if (
    offer.message.search(/sets?/i) !== -1 ||
    offer?.data('amountofleftovers') > 0
  ) {
    add('SETS');
  }

  if (offer?.data('amountofeventcards') > 0) {
    add('EVENTCARDS');
  }

  if (offer.data('amountofgems') > 0) {
    add('GEMS');
  }

  if (offer.data('commandused').search(/CSGO/) !== -1) {
    add('CSGO');
  }

  if (offer.data('commandused').search(/TF/) !== -1) {
    add('TF2');
  }

  if (offer.data('commandused').search(/HYDRA/) !== -1) {
    add('HYDRA');
  }

  if (load.length !== 0) {
    await loadInventory(load);
  }
};

const parseSetsFromArray = (appID, amount = 0) => {
  const parsedArray = [];

  for (let i = 0; i < amount; i += 1) {
    const sets = stock.botSets[appID][i];
    parsedArray.push(...sets);
  }

  return parsedArray;
};

const parseSets = (badges = {}, maxToParse = 5, perBadgeLimit = 0) => {
  const allCards = getCardsInSets();
  const resultArray = [];
  let MaxToParse = maxToParse;

  const keys = Object.keys(stock.botSets || {});

  const Badges = {};

  for (let i = 0; i < badges.length; i += 1) {
    if (badges[i].appid && badges[i].border_color === 0) {
      if (badges[i].appid !== main.eventAppID) {
        Badges[badges[i].appid] = badges[i].level;
      }
    }
  }

  for (let i = 0; i < keys.length; i += 1) {
    const appID = keys[i];
    const Stock = stock.botSets[appID].length;

    if (Object.prototype.hasOwnProperty.call(Badges, appID)) {
      if (Badges[appID] < 5) {
        const amount = Math.min(
          Stock,
          5 - Badges[appID],
          perBadgeLimit,
          MaxToParse
        );
        const parsed = parseSetsFromArray(appID, amount);

        resultArray.push(...parsed);

        MaxToParse -= amount;
      }
    } else {
      const amount = Math.min(Stock, perBadgeLimit, MaxToParse);
      const parsed = parseSetsFromArray(appID, amount);
      resultArray.push(...parsed);

      MaxToParse -= amount;
    }

    if (MaxToParse === 0) break;
  }

  return getSets(resultArray, allCards);
};

export const getAvailableSetsForCustomer = async (
  steamID,
  compare = true,
  collectorMode = false,
  maxSetsToSend = 5
) => {
  if (!compare) return parseSets({}, maxSetsToSend, collectorMode ? 1 : 5);
  const { badges } = await getBadges(steamID);
  return parseSets(badges, maxSetsToSend, collectorMode ? 1 : 5);
};
