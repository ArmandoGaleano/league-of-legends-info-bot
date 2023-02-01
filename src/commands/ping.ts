import { Client, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .setDefaultMemberPermissions(1),

  async execute(interaction, client?: Client): Promise<void> {
    interaction.reply('Pong!');
  }
};
