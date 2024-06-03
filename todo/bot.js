const { Telegraf } = require('telegraf');
const { exec } = require('child_process');
const fs = require('fs');
const bot = new Telegraf('6476127621:AAGqJKZyW6dGexQUL7Dkblb5F4rOFGotQF0');
bot.start((ctx) => {
    ctx.reply('Добро пожаловать! Нажмите кнопку "Deploy" для запуска скрипта.', {
    reply_markup: {
    inline_keyboard: [
    [{ text: 'Deploy', callback_data: 'deploy' }]
    ]
    }
    });
    });
    
    bot.action('deploy', (ctx) => {
    ctx.reply('Deploy deploy.sh...');

    exec('bash deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            ctx.reply(`Error: ${error.message}`);
            return;
        }
 
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            ctx.reply(`stderr: ${stderr}`);
            return;
        }
 
        console.log(`stdout: ${stdout}`);
        ctx.reply(`Result: ${stdout}`);
    });
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));