import { Client, GatewayIntentBits } from 'discord.js';

//discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages
  ]
});

client.once('ready', () => {
  console.log('logado com sucesso!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  } else {
    message.reply('Pelo menos deu reply!');
  }
});

client.login(process.env.DISCORD_TOKEN);
