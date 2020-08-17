const path = require('path');
const fs = require('fs');
const { restartAccount } = require('../AccountManager');

function startPlugins(overloads) {
  // expected overloads is { bot, discordConfig, client }
  const { bot } = overloads;
  bot.setMaxListeners(99);
  fs.readdirSync(path.join(__dirname, '../plugins'))
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
      const pluginPath = `../plugins/${file}`;
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const plugin = require(pluginPath);
      plugin.init(overloads);
    });
}

function bindEventsToBot(bot, overloads) {
  bot.on('kicked', (reason, loggedIn) => {
    const logString = loggedIn ? 'was' : "wasn't";
    // eslint-disable-next-line no-console
    console.log(`I was just kicked for ${reason} and ${logString} logged in.`);
    bot.end();
  });
  bot.on('end', () => {
    setTimeout(() => {
      restartAccount();
      startPlugins(overloads);
      bindEventsToBot();
    }, 5000);
  });
}

function setupDiscord(client) {
  client.login(process.env.DISCORD_TOKEN);
  client.on('ready', () => {
    // eslint-disable-next-line no-console
    if (client.user !== null) console.log(`Logged in as: ${client.user.tag}`);
  });
}

module.exports = { startPlugins, bindEventsToBot, setupDiscord };
