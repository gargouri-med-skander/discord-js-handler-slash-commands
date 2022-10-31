const settings = require(`${process.cwd()}/config/settings.json`);
const ee = require(`${process.cwd()}/config/embed.json`);
const emo = require(`${process.cwd()}/config/emojis.json`);

const colors = require("colors");

module.exports = {
  name: "hello",
  description: "Say hello.",
  cooldown: settings.cooldown,
  memberPermissions: [],
  requiredRolesIds: [],
  allowedUsersIds: [],
  type: 1,
  options: [],
  run: async (Discord, client, interaction, word) => {
    try {
      await interaction.reply({ content: `${word.slash.cmds.general.hello}` });
    } catch (error) {
      console.log(colors.red(error));
      let embedError = new Discord.EmbedBuilder()
        .setColor(ee.colors.red)
        .setTitle(`${emo.errors.false}| ${word.errors.title_2}`)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setDescription(`${word.errors.description_5}`)
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() });
      return interaction.reply({ embeds: [embedError], ephemeral: true });
    }
  }
};
