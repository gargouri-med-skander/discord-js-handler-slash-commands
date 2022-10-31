const colors = require("colors");
const fs = require("fs");

const AsciiTable = require("ascii-table");
const table = new AsciiTable();
table.setHeading("Events", "Stats").setBorder("|", "=", "0", "0");

module.exports = () => {
  try {
    const load_dir = (dir) => {
      const files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
      for (const file of files) {
        require(`../events/${dir}/${file}`);
        table.addRow(file.split(".js")[0], "✅");
      }
    };
    ["client", "guild"].forEach((e) => load_dir(e));
    console.log(colors.green(table.toString()));
  } catch (error) {
    console.log(colors.red(error));
  }
};
