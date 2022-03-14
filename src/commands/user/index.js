import { isValidCommand } from '../../components/utils.js';
import prices from './prices/index.js';
import sellCheck from './sellCheck/index.js';
import check from './check/index.js';
import stock from './stock/index.js';
import buySets from './buy/sets/index.js';
import buyCSGO from './buy/csgo/index.js';
import buyHydra from './buy/hydra/index.js';
import buyTF from './buy/tf/index.js';
import buyGems from './buy/gems/index.js';
import sellSets from './sell/sets/index.js';
import sellCSGO from './sell/csgo/index.js';
import sellHydra from './sell/hydra/index.js';
import sellTF from './sell/tf/index.js';
import sellGems from './sell/gems/index.js';
import owner from './owner/index.js';
import commands from './commands/index.js';
import checkSets from './checkAmount/sets/index.js';
import checkCSGO from './checkAmount/csgo/index.js';
import checkHydra from './checkAmount/hydra/index.js';
import checkTF from './checkAmount/tf/index.js';
import checkGems from './checkAmount/gems/index.js';

// eslint-disable-next-line consistent-return
export default (sender, msg) => {
  const input = msg.toUpperCase().split(' ')[0];
  if (isValidCommand(input, '!STOCK | !STAT | !STATU | !STATUS | !STATS')) {
    stock(sender);
  } else if (isValidCommand(input, '!OWNER')) {
    owner(sender);
  } else if (isValidCommand(input, '!COMMANDS | !COMMAND | !HELP')) {
    commands(sender);
  } else if (isValidCommand(input, '!CHECK')) {
    check(sender);
  } else if (isValidCommand(input, '!CHECKSETS')) {
    checkSets(sender, msg);
  } else if (isValidCommand(input, '!CHECKCSGO')) {
    checkCSGO(sender, msg);
  } else if (isValidCommand(input, '!CHECKHYDRA')) {
    checkHydra(sender, msg);
  } else if (isValidCommand(input, '!CHECKTF')) {
    checkTF(sender, msg);
  } else if (isValidCommand(input, '!CHECKGEMS')) {
    checkGems(sender, msg);
  } else if (isValidCommand(input, '!SELLCHECK')) {
    sellCheck(sender);
  } else if (isValidCommand(input, '!PRICE | !PRICES | !RATE | !RATES')) {
    prices(sender);
  } else if (isValidCommand(input, '!BUYSETS')) {
    buySets(sender, msg);
  } else if (isValidCommand(input, '!BUYCSGO')) {
    buyCSGO(sender, msg);
  } else if (isValidCommand(input, '!BUYHYDRA')) {
    buyHydra(sender, msg);
  } else if (isValidCommand(input, '!BUYTF')) {
    buyTF(sender, msg);
  } else if (isValidCommand(input, '!BUYGEMS')) {
    buyGems(sender, msg);
  } else if (isValidCommand(input, '!SELLSETS')) {
    sellSets(sender, msg);
  } else if (isValidCommand(input, '!SELLCSGO')) {
    sellCSGO(sender, msg);
  } else if (isValidCommand(input, '!SELLHYDRA')) {
    sellHydra(sender, msg);
  } else if (isValidCommand(input, '!SELLTF')) {
    sellTF(sender, msg);
  } else if (isValidCommand(input, '!SELLGEMS')) {
    sellGems(sender, msg);
  } else {
    return 'unknow';
  }
};
