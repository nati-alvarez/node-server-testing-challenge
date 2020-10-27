const express = require("express");
const server = express();

const petStoreModel = require("./pet_stores/petStoresModel");
server.get("/pet-stores", async (req, res)=>{
    const stores = await petStoreModel.getAll();
    res.status(200).json(stores);
});

module.exports = server;