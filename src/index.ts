/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-vars */
import './utils/Client';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { app } from './app';
import initCommandListenerDiscord from './modules/listenerCommandDiscord';
import createCommandsDiscord from './modules/createCommandsDiscord';

app.listen(process.env.PORT || 3000, () =>
  console.log('Ambiente logado com sucesso!')
);

const discordToken = process.env.DISCORD_TOKEN;

// // Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers
  ]
});

if (discordToken === undefined) {
  console.log('Discord token is undefined');
} else {
  client.on('ready', () => {
    createCommandsDiscord(client);
    initCommandListenerDiscord(client);

    client.on('messageCreate', async message => {
      if (message.content === '/lolcommandsreset') {
        await client.destroy();
        await client.login(discordToken);
      }
    });
  });
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(discordToken);
