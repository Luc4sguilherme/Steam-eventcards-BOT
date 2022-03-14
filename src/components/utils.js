/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import fs from 'graceful-fs';
import axios from 'axios';
import _ from 'lodash';

import { promisify } from 'util';
import { client } from './client.js';
import main from '../config/main.js';
import rates from '../config/rates.js';

export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);

export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const parseCardsData = (data) => {
  const db = JSON.parse(data);
  const sets = {};

  for (const appId in db) {
    sets[appId] = {
      appid: appId,
      count: db[appId],
    };
  }

  return sets;
};

export function getCardsInSets() {
  const dir = './src/data/set_data.json';

  const data = fs.readFileSync(dir, 'utf8');
  const sets = parseCardsData(data);

  return sets;
}

const maxSets = (cardsFromSortedInventory) => {
  let cardCounts = _.mapValues(
    cardsFromSortedInventory,
    (cardsArray) => cardsArray.length
  );
  cardCounts = Object.keys(cardCounts).map((key) => cardCounts[key]);
  return Math.min(...cardCounts);
};

export const getSets = (inv, data) => {
  const s = {};

  let sInventory = inv;
  sInventory = _.groupBy(
    sInventory,
    (CEconItem) => CEconItem.market_hash_name.split('-')[0]
  );

  _.forOwn(sInventory, (CEconItemArray, appid) => {
    sInventory[appid] = _.groupBy(CEconItemArray, 'classid');
  });

  _.forOwn(sInventory, (c, id) => {
    const uc = Object.keys(c).length;
    if (data[id.toString()] && uc === data[id.toString()].count) {
      const r = maxSets(c);
      s[id.toString()] = [];
      for (let i = 0; i < r; i += 1) {
        const set = [];
        _.forOwn(c, (e) => {
          set.push(e[i]);
        });
        s[id.toString()].push(set);
      }
    }
  });
  return s;
};

export const sortObjectBy = (object, iterator, method) =>
  _.flow([
    Object.entries,
    (array) => _.orderBy(array, ([, bot]) => _.get(bot, iterator), method),
    Object.fromEntries,
  ])(object);

export const playLoading = {
  playThis: ['', true],
  moon: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
  count: 0,
  timer: null,
  loading: false,
  startTimer() {
    this.timer = setInterval(() => {
      this.loading = true;
      this.playThis[0] = `${this.moon[this.count]} Loading...`;
      this.count += 1;

      if (this.count > 7) {
        this.count = 0;
      }

      client.gamesPlayed(this.playThis);
    }, 500);
  },
  resetTimer() {
    this.count = 0;
    this.loading = false;
    clearInterval(this.timer);
  },
};

export const playStock = (stock) => {
  const playThis = ['', true];

  playThis[0] = `${stock.botEventCards.length} in stock | ${rates.sell.csgo}:1 CS:GO | ${rates.sell.tf}:1 TF2 | 1:${rates.sell.gems} GEMS | 1:${rates.sell.sets} SETS`;

  client.gamesPlayed(playThis);
};

export const isValidCommand = (input, command) => {
  const regex = new RegExp(`^(${String(command).replace(/( )/g, '')})$`);
  return !!String(input).match(regex)?.[0] ?? false;
};

export const hasNumeralParameter = (msg) => {
  const command = msg.toUpperCase().replace(/!\w+\s/g, '');
  const amount = parseInt(command, 10);

  if (!Number.isNaN(amount) && parseInt(amount, 10) > 0) {
    return true;
  }
  return false;
};

export const sortSetsByAmount = (sets) =>
  Object.keys(sets).sort((k1, k2) => sets[k1].length - sets[k2].length);

export const sortSetsByAmountB = (sets) =>
  Object.keys(sets).sort((k1, k2) => sets[k1].length - sets[k2].length);

export const getBadges = (sid) =>
  new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: `https://api.steampowered.com/IPlayerService/GetBadges/v1/`,
      params: {
        key: main.steamApiKey,
        steamid: sid,
      },
    };

    axios(options)
      .then((response) => {
        if (response.status === 200 && response.data) {
          const { response: data } = response.data;

          if (data.badges) {
            resolve(data);
          } else {
            reject(new Error('Empty Badge'));
          }
        } else {
          reject(new Error(`statuscode: ${response.status}`));
        }
      })
      .catch(reject);
  });

export const getLevelExp = (level) => {
  const ExpForLevel = (tl) => Math.ceil(tl / 10) * 100;
  let exp = 0;
  for (let i = 0; i < level + 1; i += 1) {
    exp += ExpForLevel(i);
  }
  return exp;
};

export const getOfferItemInfo = (item) => {
  const {
    name,
    appid,
    contextid,
    assetid,
    classid,
    market_fee_app: marketFeeApp,
    amount,
    tags,
  } = item;

  const Tags = tags.map((tag) => tag.name);

  return {
    name,
    appid,
    contextid,
    assetid,
    classid,
    marketFeeApp,
    amount,
    tags: Tags,
  };
};
