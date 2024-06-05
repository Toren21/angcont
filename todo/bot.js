const { Telegraf } = require('telegraf');
const { exec } = require('child_process');
const fs = require('fs');
const bot = new Telegraf('6476127621:AAGqJKZyW6dGexQUL7Dkblb5F4rOFGotQF0');
bot.start((ctx) => {
    ctx.reply('Press "Deploy" buttons for build', {
    reply_markup: {
    inline_keyboard: [
    [{ text: 'Deploy Front', callback_data: 'deploy_front' }, { text: 'Deploy Back', callback_data: 'deploy_back' } ]
    ]
    }
    });
    });

    bot.action('deploy_front', (ctx) => {
    ctx.reply('Deploy Front...');

    exec('bash deploy.sh', (error, stdout, stderr) => {

        console.log(`stdout: ${stdout}`);
        ctx.reply(`Result: ${stdout}`);
    });
});
bot.action('deploy_back', (ctx) => {
  ctx.reply('Deploy Back...');

  exec('bash back.sh', (error, stdout, stderr) => {

      console.log(`stdout: ${stdout}`);
      ctx.reply(`Result: ${stdout}`);
  });
});


bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
