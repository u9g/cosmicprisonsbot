function init(overloads) {
  const { bot } = overloads;
  bot.on('message', (msg) => {
    console.log(msg.toString());
  });
}

module.exports = { init };
