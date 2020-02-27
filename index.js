const express = require("express");
const postRoute = require("./Routes/postRoute");

const server = express();
server.use(express.json());

server.use("/api/posts", postRoute);

const port = 3000;
server.listen(port, () => console.log(`\n API is running on Port ${port}\n`));
