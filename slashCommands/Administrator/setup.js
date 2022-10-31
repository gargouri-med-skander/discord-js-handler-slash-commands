const settings = require(`${process.cwd()}/config/settings.json`);
const ee = require(`${process.cwd()}/config/embed.json`);
const emo = require(`${process.cwd()}/config/emojis.json`);

const lang_db = require("../../handlers/dataBases");

const colors = require("colors");

module.exports = {
  name: "setup",
  description: "Change the language of the bot.",
  cooldown: settings.cooldown,
  memberPermissions: ["ADMINISTRATOR"],
  requiredRolesIds: [],
  allowedUsersIds: [],
  type: 1,
  options: [
    {
      name: "language",
      description: "Choose the language of the bot.",
      type: 1,
      options: [
        {
          name: "language",
          description: "Choose the language of the bot.",
          type: 3,
          required: true,
          choices: [
            {
              name: "English",
              value: "English",
            },
            {
              name: "French",
              value: "French",
            },
            {
              name: "Arabic",
              value: "Arabic",
            },
          ],
        },
      ],
    },
  ],
  run: async (Discord, client, interaction, word) => {
    try {
      let lang = interaction.options.get("language").value;
      if (lang === "English") {
        lang_db.delete(`language_${interaction.guild.id}`);
        let englishEmbed = new Discord.EmbedBuilder()
          .setColor(ee.colors.green)
          .setTitle(`${emo.errors.true}| The bot's language has been successfully changed.`)
          .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription(`The language of the bot has been changed to **English**.`)
          .setThumbnail(interaction.user.displayAvatarURL())
          .setFooter({ text: `Requested by: ${interaction.user.tag}` });
        return interaction.reply({ embeds: [englishEmbed] });
      }

      if (lang === "French") {
        lang_db.set(`language_${interaction.guild.id}`, "fr");
        let frenchEmbed = new Discord.EmbedBuilder()
          .setColor(ee.colors.green)
          .setTitle(`${emo.errors.true}| La langue du bot a été modifiée avec succès.`)
          .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription("La langue du bot a été changée en **Français**.")
          .setThumbnail(interaction.user.displayAvatarURL())
          .setFooter({ text: `Demandé par: ${interaction.user.tag}` });
        return interaction.reply({ embeds: [frenchEmbed] });
      }

      if (lang === "Arabic") {
        lang_db.set(`language_${interaction.guild.id}`, "ar")
        let arabicEmbed = new Discord.EmbedBuilder()
          .setColor(ee.colors.green)
          .setTitle(`${emo.errors.true}| تم تغيير لغة البوت بنجاح.`)
          .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription("تم تغيير لغة البوت إلى ** العربية **.")
          .setThumbnail(interaction.user.displayAvatarURL())
          .setFooter({ text: `بطلب من: ${interaction.user.tag}` });
        return interaction.reply({ embeds: [arabicEmbed] });
      } else {
        return;
      }
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
