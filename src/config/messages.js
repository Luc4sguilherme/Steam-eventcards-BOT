export default {
  request: '/me Processing your request, please hold...',
  welcome:
    'Welcome to my Trading Service, thank you for choosing me. Quick Start: Type !HELP via SteamChat \n\n',
  trade: {
    message: {
      sets: {
        0: 'Here are {SETS} set(s).',
        1: 'Here are {SETS} cards set(s) in exchange for {EVENTCARDS} {EVENTNAME} card(s). ',
      },
      eventCards: {
        0: 'Here are {EVENTCARDS} {EVENTNAME} card(s).',
        1: 'Here are {EVENTCARDS} {EVENTNAME} card(s) in exchange for {SETS} cards set(s). ',
      },
      csgo: {
        0: 'Here are {KEYS} CS:GO Key(s).',
        1: 'Here are {KEYS} CS:GO Key(s) in exchange for {EVENTCARDS} {EVENTNAME} card(s). ',
      },
      hydra: {
        0: 'Here are {KEYS} Hydra Key(s).',
        1: 'Here are {KEYS} Hydra Key(s) in exchange for {EVENTCARDS} {EVENTNAME} card(s). ',
      },
      tf: {
        0: 'Here are {KEYS} TF2 Key(s).',
        1: 'Here are {KEYS} TF2 Key(s) in exchange for {EVENTCARDS} {EVENTNAME} card(s). ',
      },
      gems: {
        0: 'Here are {GEMS} Gem(s).',
        1: 'Here are {GEMS} Gem(s) in exchange for {EVENTCARDS} {EVENTNAME} card(s). ',
      },
      leftover: 'Here are {CARDS} leftover card(s).',
      booster: 'Here are {BOOSTER} Booster Pack(s).',
    },
    check: 'Please check your Trade and accept it to receive your Items.',
    done: '\n\n Thanks for trading. Have a nice day! \n ',
    counteroffer:
      'You tried to send a counter offer, trade will be canceled. TradeID:{OFFERID}',
    expired: 'Tradeoffer expired. TradeID:{OFFERID}',
    canceled: 'Tradeoffer offer with ID:{OFFERID} canceled.',
    declined: {
      us: 'Tradeoffer declined. TradeID:{OFFERID}',
      them: 'You declined the Tradeoffer. TradeID:{OFFERID}',
    },
    accepted: 'The Tradeoffer has been accepted. TradeID:{OFFERID}',
    escrow: `Tradeoffer aborted because user is in escrow and can't trade. TradeID:{OFFERID}`,
    notificationToAdmin: {
      sell: 'Trade completed with {CURRENCY} sent and {EVENTCARDS} {EVENTNAME} card(s) received. TradeID: {OFFERID}',
      buy: 'Trade completed with {EVENTCARDS} {EVENTNAME} card(s) sent and {CURRENCY} received. TradeID: {OFFERID}',
    },
  },

  loading: "I'm currently loading my inventory. Please try again later",

  block: {
    error: 'An error occurred while blocking user',
    response: 'User has been blocked.',
    notallowed: "The bot can't block you.",
  },

  unblock: {
    error: 'An error occurred while unblocking user',
    response: 'User has been unblocked.',
    notallowed: "The bot can't unblock you.",
  },
  error: {
    getoffer:
      'An error occurred while getting your offers. Please try again later!',
    canceloffer:
      'An error occurred while canceling your offers. Please try again later!',
    nonexistentoffer:
      'Offer with ID:{OFFERID} is not active, so it may not be cancelled.',
    inputinvalid: {
      sets: 'Please provide a valid amount of sets - example: {command}',
      keys: 'Please provide a valid amount of keys - example: {command}',
      gems: 'Please provide a valid amount of gems - example: {command}',
      eventCards:
        'Please provide a valid amount of {EVENTNAME} cards - example: {command}',
      offerid: 'Please enter a valid offerID - example: {command}',
      booster:
        'Please provide a valid amount of booster pack - example: {command}',
      steamid64: 'Please provide a valid SteamID64',
      message: 'Please enter a message',
      amountover: {
        keys: 'Please try a lower amount of key(s). The maximum amount for this command is {KEYS}.',
        sets: 'Please try a lower amount of set(s). The maximum amount for this command is {SETS}.',
        gems: 'Please try a lower amount of gem(s). The maximum amount for this command is {GEMS}.',
        eventCards:
          'Please try a lower amount of {EVENTNAME} cards. The maximum amount for this command is {EVENTCARDS}.',
      },
      amountlow: {
        keys: "Sorry but I can't sell you nothing with that amount of key(s). - use: !PRICES \n",
        sets: "Sorry but I can't sell you nothing with that amount of set(s). - use: !PRICES \n",
        gems: "Sorry but I can't sell you nothing with that amount of gem(s). - use: !PRICES \n",
        eventCards:
          "Sorry but I can't sell you nothing with that amount of {EVENTNAME} cards. - use: !PRICES \n",
      },
    },
    unknowCommand:
      'Command not recognized. Use !COMMANDS to see how this bot works.',
    unknowAdminCommand:
      'Command not recognized. Use !COMMANDS or !ADMIN to see how this bot works.',
    privateinventory:
      'There was an error loading your inventory as it is private. Set your profile to public and try again',

    loadinventory: {
      them: 'An error occurred while loading your inventory. Please try later',
      me: "An error occurred while loading the bot's inventory. Please try later.",
    },

    outofstock: {
      admin: {
        sets: {
          them: "You don't have enough sets to send. (You have {SETS} set(s))",
          me: `The bot don't have enough sets to send. (He has {SETS} set(s))`,
        },
        keys: {
          them: "You don't have enough keys to send. (You have {KEYS} key(s))",
          me: `The bot don't have enough keys to send. (He has {KEYS} key(s))`,
        },
        gems: {
          them: "You don't have enough gems to send. (You have {GEMS} gem(s))",
          me: `The bot don't have enough gems to send. (He has {GEMS} gem(s))`,
        },
        eventCards: {
          them: "You don't have enough {EVENTNAME} cards to send. (You have {EVENTCARDS} {EVENTNAME} card(s))",
          me: `The bot don't have enough {EVENTNAME} cards to send. (He has {EVENTCARDS} {EVENTNAME} card(s))`,
        },
        booster: {
          them: "You don't have enough Booster Pack to send. (You have {BOOSTER} Booster Pack)",
          me: "The bot don't have enough Booster Pack to send. (He has {BOOSTER} Booster Pack)",
        },
        leftover: `You don't have leftover cards.`,
      },
      common: {
        sets: {
          them: "You don't have enough sets. Please try again later.",
          me: `I don't have enough sets. Please try again later.`,
        },
        keys: {
          them: "You don't have enough keys. Please try again later.",
          me: `I don't have enough keys. Please try again later.`,
        },
        gems: {
          them: "You don't have enough gems. Please try again later.",
          me: `I don't have enough gems. Please try again later.`,
        },
        eventCards: {
          them: `You don't have enough {EVENTNAME} cards. Please try again later.`,
          me: "I don't have enough {EVENTNAME} cards. Please try again later.",
        },
      },
    },

    tradehold:
      'An error occurred while getting your trade holds. Make sure you have no trade hold. Please try again!',
    sendtrade:
      'An error occurred while sending your trade. Steam Trades could be down. Please try again later.',
    unpack: "The bot don't have Booster Pack.",
    badges: {
      0: 'Your badges could not be retrieved. Make sure your Steam Profile is public and try again.',
      1: 'An error occurred while loading your badges. Please try again later.',
      2: 'Your badges are empty, sending an offer without checking badges.',
    },
    level: {
      0: 'Your level could not be retrieved. Make sure your Steam Profile is public and try again.',
      1: 'An error occurred while getting your level. Please try again later.',
    },
  },

  unpack: 'Unpacked {BOOSTER} Booster Pack.',
  sellCheck: {
    currencies: {
      sets: ' • {CARDS} {EVENTNAME} card(s) for {SETS} cards set(s) - !SELLSETS {SETS} \n ',
      csgo: ' • {CARDS} {EVENTNAME} card(s) for {KEYS} cs:go key(s) - !SELLCSGO {KEYS} \n ',
      hydra:
        ' • {CARDS} {EVENTNAME} card(s) for {KEYS} hydra key(s) - !SELLHYDRA {KEYS} \n ',
      tf: ' • {CARDS} {EVENTNAME} card(s) for {KEYS} tf2 key(s) - !SELLTF {KEYS} \n ',
      gems: ' • {CARDS} {EVENTNAME} card(s) for {GEMS} gem(s) - !SELLGEMS {CARDS} \n ',
    },
    response:
      '/pre You currently have {CARDS} {EVENTNAME} card(s) I can request. \n\n' +
      '- I can get it by paying one of the following currencies: \n{MESSAGE}',
  },
  check: {
    currencies: {
      sets: ' • {CARDS} {EVENTNAME} card(s) for {SETS} cards set(s) - !BUYSETS {SETS} \n ',
      csgo: ' • {CARDS} {EVENTNAME} card(s) for {KEYS} cs:go key(s) - !BUYCSGO {KEYS} \n ',
      hydra:
        ' • {CARDS} {EVENTNAME} card(s) for {KEYS} hydra key(s) - !BUYHYDRA {KEYS} \n ',
      tf: ' • {CARDS} {EVENTNAME} card(s) for {KEYS} tf2 key(s) - !BUYTF {KEYS} \n ',
      gems: ' • {CARDS} {EVENTNAME} card(s) for {GEMS} gem(s) - !BUYGEMS {CARDS} \n ',
    },
    response:
      '/pre I currently have {CARDS} {EVENTNAME} card(s). \n\n' +
      ' - You can get the card(s) by paying one of the following currencies: \n{MESSAGE}',
  },

  checkAmount: {
    sets: '/pre With {SETS} set(s) you can get {EVENTCARDS} {EVENTNAME} card(s). \n\nInterested?, try: \n !BUYSETS {SETS}',
    csgo: '/pre With {KEYS} key(s) you can get {EVENTCARDS} {EVENTNAME} card(s). \n\nInterested?, try: \n !BUYCSGO {KEYS}',
    hydra:
      '/pre With {KEYS} key(s) you can get {EVENTCARDS} {EVENTNAME} card(s). \n\nInterested?, try: \n !BUYHYDRA {KEYS}',
    tf: '/pre With {KEYS} key(s) you can get {EVENTCARDS} {EVENTNAME} card(s). \n\nInterested?, try: \n !BUYTF {KEYS}',
    gems: '/pre With {GEMS} gem(s) you can get {EVENTCARDS} {EVENTNAME} card(s). \n\nInterested?, try: \n !BUYGEMS {EVENTCARDS}',
  },

  stock:
    '/pre I currently have in my inventory: \n' +
    ' • {EVENTCARDS} {EVENTNAME} card(s). \n' +
    ' • {TOTALBOTSETS} cards set(s) from {VARIETYOFGAMES} Game(s). \n' +
    ' • {CSKEYSTRADABLE} tradable CS:GO key(s), and {CSKEYSNOTRADABLE} non-tradable CS:GO key(s). \n' +
    ' • {HYDRAKEYSTRADABLE} tradable HYDRA key(s), and {HYDRAKEYSNOTRADABLE} non-tradable HYDRA key(s). \n' +
    ' • {TFKEYSTRADABLE} tradable TF2 key(s), and {TFKEYSNOTRADABLE} non-tradable TF2 key(s). \n' +
    ' • {GEMSQUANTITYTRADABLE} tradable Gem(s), and {GEMSQUANTITYNOTRADABLE} non-tradable Gem(s).',

  prices:
    '/pre Currently, prices are: \n\n' +
    '- You can buy: \n' +
    ' • {SETSBUY} {EVENTNAME} card(s) for 1 cards set \n' +
    ' • {CSGOBUY} {EVENTNAME} card(s) for 1 CS:GO key  \n' +
    ' • {HYDRABUY} {EVENTNAME} card(s) for 1 HYDRA key \n' +
    ' • {TFBUY} {EVENTNAME} card(s) for 1 TF2 key \n' +
    ' • 1 {EVENTNAME} card for {GEMSBUY} gems\n\n' +
    '- You can sell: \n' +
    ' • {SETSSELL} {EVENTNAME} card(s) for 1 cards set \n' +
    ' • {CSGOSELL} {EVENTNAME} card(s) for 1 CS:GO key  \n' +
    ' • {HYDRASELL} {EVENTNAME} card(s) for 1 HYDRA key \n' +
    ' • {TFSELL} {EVENTNAME} card(s) for 1 TF2 key \n' +
    ' • 1 {EVENTNAME} card for {GEMSSELL} gems\n\n',

  adminCommands: [
    'Commands: \n',
    '► !RELOAD = Reload Inventory. \n',
    '► !AUTHCODE = Shows auth code. \n',
    '► !DIE = Turn off the bot. \n',
    '► !RESTART = Restart the bot. \n',
    '► !CANCEL (OFFERID) = Cancel the trade offer. \n',
    '► !UNPACK = Unpack all boosters. \n',
    '► !BLOCK (ID64) = Block user. \n',
    '► !UNBLOCK (ID64) = Unlock user. \n',
    '► !BROADCAST (message) = Send a message to all friends. \n',
    '► !WITHDRAWEVENTCARDS = Withdraw a specific amount of {EVENTNAME} cards. \n',
    '► !WITHDRAWBOOSTER = Withdraw a specific amount of booster. \n',
    '► !WITHDRAWCSGO = Withdraw a specific amount of cs:go keys. \n',
    '► !WITHDRAWHYDRA = Withdraw a specific amount of hydra keys. \n',
    '► !WITHDRAWTF = Withdraw a specific amount of tf2 keys. \n',
    '► !WITHDRAWGEMS = Withdraw a specific amount of gems. \n',
    '► !WITHDRAWSETS = Withdraw a specific amount of sets. \n',
    '► !DEPOSITEVENTCARDS = eposits a specific amount of {EVENTNAME} cards. \n',
    '► !DEPOSITBOOSTER = Deposits a specific amount of booster. \n',
    '► !DEPOSITCSGO = Deposits a specific amount of cs:go keys. \n',
    '► !DEPOSITHYDRA = Deposits a specific amount of hydra keys. \n',
    '► !DEPOSITTF = Deposits a specific amount of tf2 keys. \n',
    '► !DEPOSITGEMS = Deposits a specific amount of gems. \n',
    '► !DEPOSITSETS = Deposits a specific amount of sets. \n',
  ],

  commands: [
    'Commands: \n',
    '► !PRICES = Shows our current rates. \n',
    '► !STOCK = Shows currencies stock of the bot. \n',
    '► !OWNER = Shows owner account. \n',
    '► !CHECK = Checks how many {EVENTNAME} card(s) you can buy. \n',
    '► !SELLCHECK = Checks how many {EVENTNAME} card(s) the bot can buy from you. \n\n',
    'SETS Section. \n',
    `► !CHECKSETS (amount_of_sets) = Shows how many {EVENTNAME} card(s) you'll receive, following bot rates. \n`,
    '► !BUYSETS (amount_of_sets) = Buy {EVENTNAME} card(s) for a specific amount of cards set(s), following the current BOT rate. \n',
    '► !SELLSETS (amount_of_sets) = Sell {EVENTNAME} card(s) and get a specific amount of cards set(s), following the current BOT rate.\n\n',
    'CSGO Section. \n',
    `► !CHECKCSGO (amount_of_keys) = Shows how many {EVENTNAME} card(s) you'll receive, following bot rates. \n`,
    '► !BUYCSGO (amount_of_keys) = Buy {EVENTNAME} card(s) for a specific amount of key(s), following the current BOT rate. \n',
    '► !SELLCSGO (amount_of_keys) = Sell {EVENTNAME} card(s) and get a specific amount of key(s), following the current BOT rate.\n\n',
    'HYDRA Section. \n',
    `► !CHECKHYDRA (amount_of_keys) = Shows how many {EVENTNAME} card(s) you'll receive, following bot rates. \n`,
    '► !BUYHYDRA (amount_of_keys) = Buy {EVENTNAME} card(s) for a specific amount of key(s), following the current BOT rate. \n',
    '► !SELLHYDRA (amount_of_keys) = Sell {EVENTNAME} card(s) and get a specific amount of key(s), following the current BOT rate.\n\n',
    'TF2 Section. \n',
    `► !CHECKTF (amount_of_keys) = Shows how many {EVENTNAME} card(s) you'll receive, following bot rates. \n`,
    '► !BUYTF (amount_of_keys) = Buy {EVENTNAME} card(s) for a specific amount of key(s), following the current BOT rate. \n',
    '► !SELLTF (amount_of_keys) = Sell {EVENTNAME} card(s) and get a specific amount of key(s), following the current BOT rate.\n\n',
    'GEMS Section. \n',
    `► !CHECKGEMS (amount_of_gems) = Shows how many {EVENTNAME} card(s) you'll receive, following bot rates. \n`,
    '► !BUYGEMS (amount_of_event_cards) = Buy a specific amount of {EVENTNAME} card(s) for  gem(s), following the current BOT rate. \n',
    '► !SELLGEMS (amount_of_event_cards) = Sell a specific amount of {EVENTNAME} card(s) and get gem(s), following the current BOT rate.\n\n',
  ],
};
