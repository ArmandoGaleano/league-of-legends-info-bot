/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from 'fs';
import path from 'path';
import { Client, Collection } from 'discord.js';

const createCommandsDiscord = (client: Client) => {
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    console.log(filePath);
    import(filePath).then(command => {
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if (
        'data' in command &&
        'execute' in command &&
        client.application !== null
      ) {
        client.application.commands.create({
          name: command.data.name,
          description: command.data.description,
          options: command.data.options
        });
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    });
  }
};

export default createCommandsDiscord;
