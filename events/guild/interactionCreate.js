const ee = require("../../config/embed.json");
const emo = require("../../config/emojis.json");

const lang_db = require("../../handlers/dataBases");

const colors = require("colors");
const ms = require("ms");

const Discord = require("discord.js");
const client = require("../..");
const delay = new Discord.Collection();

client.on("interactionCreate", async (interaction) => {
  let lang = await lang_db.get(`language_${interaction.guild.id}`);
  if (lang == null) {
    lang = "en";
  }
  if (lang == "fr") {
    lang = "fr"
  }
  if (lang == "ar") {
    lang = "ar"
  }
  const word = require(`${process.cwd()}/languages/${lang}.json`);
  const slashCommand = client.slashCommands.get(interaction.commandName);
  if (interaction.type == 4) {
    if (slashCommand.autocomplete) {
      const choices = [];
      await slashCommand.autocomplete(interaction, choices);
    }
  }
  if (!interaction.type == 2) return;
  if (!slashCommand)
    return client.slashCommand.delete(interaction.commandName);
  try {
    if (slashCommand.cooldown) {
      if (delay.has(`${slashCommand.name}-${interaction.user.id}`)) {
        let timeLeft = ms(delay.get(`${slashCommand.name}-${interaction.user.id}`) - Date.now(), { long: true }).includes("ms") ? "0 second" : ms(delay.get(`${slashCommand.name}-${interaction.user.id}`) - Date.now(), { long: true });
        let embedCooldown = new Discord.EmbedBuilder()
          .setColor(ee.colors.red)
          .setTitle(`${emo.errors.false}| ${word.errors.title_1}`)
          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
          .setDescription(`${word.errors.description_1.text_1} **${timeLeft}** ${word.errors.description_1.text_2} \`${slashCommand.name}\``)
          .setThumbnail(interaction.guild.iconURL())
          .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
        return interaction.reply({ embeds: [embedCooldown], ephemeral: true });
      }
    }

    if (slashCommand.memberPermissions && slashCommand.memberPermissions.length > 0 && !interaction.member.permissions.has(slashCommand.memberPermissions)) {
      let embedmemberPermissions = new Discord.EmbedBuilder()
        .setColor(ee.colors.red)
        .setTitle(`${emo.errors.false}| ${word.errors.title_1}`)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setDescription(`${word.errors.description_2} \`${slashCommand.memberPermissions}\``)
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      return interaction.reply({ embeds: [embedmemberPermissions], ephemeral: true });
    }

    if (slashCommand.requiredRolesIds && slashCommand.requiredRolesIds.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => slashCommand.requiredRolesIds.includes(r.id))) {
      let embedRolesPerms = new Discord.EmbedBuilder()
        .setColor(ee.colors.red)
        .setTitle(`${emo.errors.false}| ${word.errors.title_1}`)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setDescription(`${word.errors.description_3} <@&${slashCommand.requiredRolesIds}>`)
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      return interaction.reply({ embeds: [embedRolesPerms], ephemeral: true });
    }

    if (slashCommand.allowedUsersIds && slashCommand.allowedUsersIds.length > 0 && !slashCommand.allowedUsersIds.includes(interaction.member.id)) {
      let embedUserPerms = new Discord.EmbedBuilder()
        .setColor(ee.colors.red)
        .setTitle(`${emo.errors.false}| ${word.errors.title_1}`)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setDescription(`${word.errors.description_4} <@!${slashCommand.allowedUsersIds}>`)
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      return interaction.reply({ embeds: [embedUserPerms], ephemeral: true });
    }

    await slashCommand.run(Discord, client, interaction, word);
    delay.set(`${slashCommand.name}-${interaction.user.id}`, Date.now() + slashCommand.cooldown * 1000);
    setTimeout(() => {
      delay.delete(`${slashCommand.name}-${interaction.user.id}`);
    }, slashCommand.cooldown * 1000);
  } catch (error) {
    console.log(colors.red(error));
  }
});
