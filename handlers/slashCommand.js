const colors = require("colors");
const fs = require("fs");

const AsciiTable = require("ascii-table");
const table = new AsciiTable().setHeading("Slash Commands", "Stats").setBorder("|", "=", "0", "0");

const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const Discord = require("discord.js");

const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const rest = new REST({ version: "10" }).setToken(TOKEN);

module.exports = (client) => {
  const slashCommands = [];
  fs.readdirSync("./slashCommands/").forEach(async (dir) => {
    const files = fs.readdirSync(`./slashCommands/${dir}/`).filter((file) => file.endsWith(".js"));
    for (const file of files) {
      const slashCommand = require(`../slashCommands/${dir}/${file}`);
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
        default_member_permissions: slashCommand.default_member_permissions ? Discord.PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null,
      });
      if (slashCommand.name) {
        client.slashCommands.set(slashCommand.name, slashCommand);
        table.addRow(file.split(".js")[0], "✅");
      } else {
        table.addRow(file.split(".js")[0], "⛔");
      }
    }
  });
  console.log(colors.green(table.toString()));
  (async () => {
    try {
      let data = await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: slashCommands });
      console.log(colors.green(`Started refreshing ${slashCommands.length} application (/) commands.`));
      console.log(colors.green(`Successfully reloaded ${data.length} application (/) commands.`));
    } catch (error) {
      console.log(colors.red(error));
    }
  })();
};
