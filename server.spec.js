const request = require("supertest");
const server = require("./server.js");

describe("server.js", ()=>{
    describe("pet-stores GET route", ()=>{
        it("Should respond with 200 status code", async()=>{
            const response = await request(server).get("/pet-stores");
            expect(response.status).toEqual(200);
        });

        it("Should return an array of pet stores", async()=>{
            const response = await request(server).get("/pet-stores");
            expect(Array.isArray(response.body)).toEqual(true);
        });

        it("Should return in a JSON format", async()=>{
            const response = await request(server).get("/pet-stores");
            expect(response.type).toEqual("application/json");
        })
    });
});