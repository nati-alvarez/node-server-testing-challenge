const express = require("express");
const server = express();

server.use(express.json());

const petStoreModel = require("./pet_stores/petStoresModel");
server.get("/pet-stores", async (req, res)=>{
    const stores = await petStoreModel.getAll();
    res.status(200).json(stores);
});

server.post("/pet-stores", async(req, res)=>{
    const {name, address, specialty} = req.body;
    if(!name || !address) return res.status(400).json({message: "Store name and address required"});
    try {
        const newStore = await petStoreModel.addStore({name, address, specialty});
        res.status(201).json(newStore);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred"});
    }
});

module.exports = server;