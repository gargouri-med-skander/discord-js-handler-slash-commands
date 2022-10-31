const { description } = require("../../package.json");

const colors = require("colors");

const { ActivityType } = require("discord.js");
const client = require("../..");

client.on("ready", () => {
  let activities = [
    {
      name: `${client.guilds.cache.size} Servers`,
      type: ActivityType.Listening,
    },
    {
      name: `${client.channels.cache.size} Channels`,
      type: ActivityType.Playing,
    },
    { name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
    { name: "Firas Zr#1787", type: ActivityType.Competing },
  ];
  let a = 0;
  setInterval(() => {
    if (a >= activities.length) a = 0;
    client.user.setActivity(activities[a]);
    a++;
  }, 5000);


  let status = ["online", "dnd", "idle"];
  let b = 0;
  setInterval(() => {
    if (b >= activities.length) b = 0;
    client.user.setStatus(status[b]);
    b++;
  }, 30000);
  console.log(colors.green(`Logged in as ${client.user.tag}!`));
  console.log(colors.green(description));
});
