import authcode from './authcode/index.js';
import commands from './commands/index.js';
import die from './die/index.js';
import reload from './reload/index.js';
import restart from './restart/index.js';
import depositGems from './deposit/gems/index.js';
import depositTF from './deposit/tf2/index.js';
import depositCSGO from './deposit/csgo/index.js';
import depositHYDRA from './deposit/hydra/index.js';
import depositEventCards from './deposit/eventCard/index.js';
import depositBooster from './deposit/booster/index.js';
import withdrawGems from './withdraw/gems/index.js';
import withdrawTF from './withdraw/tf2/index.js';
import withdrawCSGO from './withdraw/csgo/index.js';
import withdrawHYDRA from './withdraw/hydra/index.js';
import withdrawBooster from './withdraw/booster/index.js';
import withdrawEventCards from './withdraw/eventCard/index.js';
import { isValidCommand } from '../../components/utils.js';
import cancel from './cancel/index.js';
import unpack from './unpack/index.js';
import block from './block/index.js';
import unblock from './unblock/index.js';
import broadCast from './broadCast/index.js';

// eslint-disable-next-line consistent-return
export default (sender, msg) => {
  const input = msg.toUpperCase().split(' ')[0];

  if (isValidCommand(input, '!AUTHCODE | !2FA')) {
    authcode(sender);
  } else if (isValidCommand(input, '!ADMIN')) {
    commands(sender);
  } else if (isValidCommand(input, '!DIE | !DEADEND | !CLOSE')) {
    die(sender);
  } else if (isValidCommand(input, '!RELOAD')) {
    reload(sender);
  } else if (isValidCommand(input, '!RESTART | !RELOG | !RELOGIN')) {
    restart(sender);
  } else if (isValidCommand(input, '!CANCEL')) {
    cancel(sender, msg);
  } else if (
    isValidCommand(
      input,
      '!DEPOSITGEMS | !DEPOSITGEM | !GEMSDEPOSIT | !GEMDEPOSIT | !GEDP'
    )
  ) {
    depositGems(sender, msg);
  } else if (
    isValidCommand(
      input,
      '!DEPOSITTF | !DEPOSITTF2 | !TF2DEPOSIT | !TFDEPOSIT | !TFDP'
    )
  ) {
    depositTF(sender, msg);
  } else if (
    isValidCommand(
      input,
      '!DEPOSITCSGO | !DEPOSITCS | !CSGODEPOSIT | !CSDEPOSIT | !CSDP'
    )
  ) {
    depositCSGO(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITHYDRA | !HYDRADEPOSIT | !HYDP')) {
    depositHYDRA(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITEVENTCARDS | !EVDP')) {
    depositEventCards(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITBOOSTER | !BODP')) {
    depositBooster(sender, msg);
  } else if (
    isValidCommand(
      input,
      '!WITHDRAWGEMS | !WITHDRAWGEM | !GEMSWITHDRAW | !GEMWITHDRAW | !GEWD'
    )
  ) {
    withdrawGems(sender, msg);
  } else if (
    isValidCommand(
      input,
      '!WITHDRAWTF | !WITHDRAWTF2 | !TF2WITHDRAW | !TFWITHDRAW | !TFWD'
    )
  ) {
    withdrawTF(sender, msg);
  } else if (
    isValidCommand(
      input,
      '!WITHDRAWCSGO | !WITHDRAWCS | !CSGOWITHDRAW | !CSWITHDRAW | !CSWD'
    )
  ) {
    withdrawCSGO(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWHYDRA | !HYDRAWITHDRAW | !HYWD')) {
    withdrawHYDRA(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWEVENTCARDS | !EVWD')) {
    withdrawEventCards(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWBOOSTER | !BOWD')) {
    withdrawBooster(sender, msg);
  } else if (isValidCommand(input, '!UNPACK')) {
    unpack(sender);
  } else if (isValidCommand(input, '!BLOCK')) {
    block(sender, msg);
  } else if (isValidCommand(input, '!UNBLOCK')) {
    unblock(sender, msg);
  } else if (isValidCommand(input, '!BROADCAST')) {
    broadCast(sender, msg);
  } else {
    return 'unknow';
  }
};
