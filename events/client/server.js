const express = require("express");
const server = express();
const colors = require("colors");

server.all("/", (req, res) => {
  res.send("Let's get started");
});

server.listen(3000, () => {
  console.log(colors.green("Server is Ready!"));
});
