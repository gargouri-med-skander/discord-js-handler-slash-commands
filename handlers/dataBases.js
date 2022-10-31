const colors = require("colors");
const { Database } = require("st.db");

module.exports = () => {
  try {
    // lang_db
    const lang_db = new Database(`${process.cwd()}/dataBases/settings/language.json`, { pathOutsideTheProject: true });

    module.exports = lang_db;
  } catch (error) {
    console.log(colors.red(error));
  }
};
