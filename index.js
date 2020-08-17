const Discord = require('discord.js');
const loginHelper = require('./util/LoginHelper');
require('dotenv').config();
const discordConfig = require('./config/discord.json');

const client = new Discord.Client({ disableEveryone: true });
loginHelper.setupDiscord(client);

const { bot } = require('./AccountManager');

// start bot
const overloads = { bot, discordConfig, client };
loginHelper.startPlugins(overloads);
loginHelper.bindEventsToBot(bot, overloads);
