function init(overloads) {
  const { bot } = overloads;
  bot.on('spawn', () => bot.chat('/j 2'));
}

module.exports = { init };
