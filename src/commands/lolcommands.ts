import { Client, SlashCommandBuilder } from 'discord.js';
import createCommandsDiscord from '../modules/createCommandsDiscord';
const discordToken = process.env.DISCORD_TOKEN;

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
        .addChoices({ name: 'reset', value: 'reset' })
        .addChoices({ name: 'oloco', value: 'oloco' })
    ),

  async execute(interaction, client: Client): Promise<void> {
    const { options } = interaction;
    const optionValue = options._hoistedOptions[0].value;

    console.log(options._hoistedOptions);
    if (optionValue === 'reset') {
      await interaction.reply({
        content: 'Commands reseted!',
        ephemeral: true
      });
      await client.destroy();
      await client.login(discordToken);
      console.log('commands reseted!');
    }

    if (optionValue === 'oloco') {
      await interaction.reply({
        content: 'Are you boy?',
        ephemeral: true
      });
    }
  }
};
