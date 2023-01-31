/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Collection } from 'discord.js';
import { REST, Routes } from 'discord.js';

export const updateCommands = async (
  commands: Collection<unknown, any>,
  clientId: string,
  guildId: string,
  token: string
): Promise<void> => {
  const _commands = commands.map((command: any) => command);

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: '10' }).setToken(token);

  // and deploy your commands!

  try {
    console.log(
      `Started refreshing ${_commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};
