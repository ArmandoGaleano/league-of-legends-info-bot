/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from 'fs';
import path from 'path';
import {
  ApplicationCommandDataResolvable,
  Client,
  Collection
} from 'discord.js';

const createCommandsDiscord = (client: Client) => {
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  const getPromiseCommands = async () => {
    const commands: Promise<any>[] = commandFiles.map(file => {
      return new Promise(async resolve => {
        const filePath = path.join(commandsPath, file);
        const command = await import(filePath).then(command => command);

        if (
          'data' in command &&
          'execute' in command &&
          client.application !== null
        ) {
          resolve(command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      });
    });

    const commandsResolved = await Promise.all(commands).then(
      _commands => _commands
    );

    return commandsResolved;
  };

  getPromiseCommands().then(commands => {
    const handlerCommands = commands.map(command => {
      return {
        name: command.data.name,
        description: command.data.description,
        options: command.data.options
      };
    });
    console.log('Comandos adicionados!');
    console.log('commands');
    console.log(handlerCommands);
    client.application?.commands.set(handlerCommands);
  });
};

export default createCommandsDiscord;
