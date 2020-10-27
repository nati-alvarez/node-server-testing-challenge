const express = require("express");
const server = express();

server.get("/pet-store", ()=>{
    res.sendStatus(200);
});

module.exports = server;