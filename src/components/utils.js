/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import fs from 'graceful-fs';

import { promisify } from 'util';
import { client } from './client.js';
import rates from '../config/rates.js';

export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);

export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  playThis[0] = `${stock.botEventCards.length} in stock | ${rates.sell.csgo}:1 CS:GO | ${rates.sell.tf}:1 TF2 | 1:${rates.sell.gems} GEMS`;

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
