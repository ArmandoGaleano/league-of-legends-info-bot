//APP EXPRESS
import { app } from './app';
import { Client, Events, GatewayIntentBits } from 'discord.js';
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App ouvindo na porta: ${port}`);
});

app.get('/', (req, res) => {
  res.json({
    hello: 'world'
  });
});

const discordToken = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages
  ]
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('ready', () => {
  console.log('Nao faco ideia do que esta acontecendo');
});

client.on('message', message => {
  console.log('alguma mensagem funcionou');
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

// Log in to Discord with your client's token
client.login(discordToken);

process.on('SIGINT', () => {
  server.close();
  console.log('App finalizado!');
});
