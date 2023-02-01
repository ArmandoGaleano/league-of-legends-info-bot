/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Client, SlashCommandBuilder } from 'discord.js';
import createCommandsDiscord from '../modules/createCommandsDiscord';

const lolcommandsoptions = [
  { name: 'reset', value: 'reset' },
  { name: 'caralho', value: 'caralho' }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lolcommands')
    .setDescription('Replies with Pong!')
    .setDefaultMemberPermissions(1)
    .addStringOption(option =>
      option
        .setName('types')
        .setDescription('The gif category')
        .setRequired(true)
        .setChoices(...lolcommandsoptions)
    ),

  async execute(interaction, client: Client): Promise<void> {
    const { options } = interaction;
    const optionValue = options._hoistedOptions[0].value;
    if (optionValue === 'reset') {
      createCommandsDiscord(client);
      await interaction.reply({
        content: 'Commands reseted!',
        ephemeral: true
      });
    }

    if (optionValue === 'caralho') {
      await interaction.reply({
        content: 'Are you pato?',
        ephemeral: true
      });
    }
  }
};
