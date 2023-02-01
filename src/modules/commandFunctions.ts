/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Collection, Client } from 'discord.js';

interface GetAllCommandsReturn {
  error: boolean;
  message?: string;
  commands?: Collection<unknown, any>;
}

export const getAllCommands = (client: Client) => {
  if (client.application !== null) {
    return client.application.commands
      .fetch()
      .then(commands => {
        const res: GetAllCommandsReturn = {
          error: false,
          commands
        };

        return res;
      })
      .catch(error => {
        const res: GetAllCommandsReturn = {
          error: true,
          message: error
        };

        console.error(error);
        return res;
      });
  }

  const res: GetAllCommandsReturn = {
    error: true,
    message: 'client.application is null'
  };

  return res;
};

export const deleteCommands = async (client: Client, commands: string[]) => {
  const clientAppCommands = await getAllCommands(client);

  if (!clientAppCommands.error && clientAppCommands.commands) {
    const clientAppCommandsFiltered = clientAppCommands.commands.filter(
      command => {
        return commands.includes(command.name);
      }
    );

    clientAppCommandsFiltered.forEach(command => {
      client.application?.commands.delete(command.id);
      console.log('O comando ' + command.name + ' foi deletado com sucesso!');
    });

    console.log('deleteCommands finish');
    console.log('delete' + clientAppCommandsFiltered.size + 'commands');
  }
};
