const request = require("supertest");
const server = require("./server.js");

describe("server.js", ()=>{
    describe("pet-stores route", ()=>{
        it("Should respond with 200 status code", async()=>{
            const response = await request(server).get("/pet-stores");c
        });
    });
});