const mineflayer = require('mineflayer');
require('dotenv').config();

const options = {
  host: process.env.MC_IP,
  username: process.env.MC_USER,
  password: process.env.MC_PASS,
};

let bot = mineflayer.createBot(options);

function restartAccount() {
  bot = mineflayer.createBot(options);
}

module.exports = { restartAccount, bot };
