require("dotenv").config();
const colors = require("colors");
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [32767],
  partials: ["Message", "User", "Channel", "Reaction", "GuildMember", "ThreadMember", "GuildScheduledEvent"]
});

client.slashCommands = new Discord.Collection();
module.exports = client;

fs.readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN).catch((error) => {
  console.log(colors.red(error));
});
