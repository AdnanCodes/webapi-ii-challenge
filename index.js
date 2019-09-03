const express = require("express");
const DataBase = require("./data/db");

const server = express();
server.use(express.json());

//Build Endpoints

const port = 3000;
server.listen(port, () => console.log(`\n API is running on Port ${port}\n`));
