/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from 'fs';
import path from 'path';
import { Client, Events } from 'discord.js';

const initCommandListenerDiscord = (client: Client) => {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  //Quando um comando for executado no chat do servidor vai ser execultado seu método {execute}
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const file = commandFiles.find(
      fileName => fileName.replace(/\.js/gm, '') === interaction.commandName
    );
    const filePath = file !== undefined ? path.join(commandsPath, file) : null;

    if (filePath !== null) {
      import(filePath).then(async command => {
        try {
          await command?.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
          });
        }
      });
    } else {
      interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      });
    }
  });
};

export default initCommandListenerDiscord;
