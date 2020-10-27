const request = require("supertest");
const server = require("./server.js");
const db = require("./data/db");

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
    
    describe("pet-stores POST route", ()=>{
        beforeEach(async()=>{
            await db("Pet_Store").truncate();
        });

        it("Should respond with 201 status code on successful insertion", async()=>{
            const body = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            const response = await request(server).post("/pet-stores").send(body);

            expect(response.status).toEqual(201);
        });

        it("Should respond with 400 status if required data not given", async()=>{
            const response = await request(server).post("/pet-stores").send({});

            expect(response.status).toEqual(400);
        });

        it("Should return relevant error message if required data not given", async()=>{
            const errorResponse = {message: "Store name and address required"};
            const response = await request(server).post("/pet-stores").send({});

            expect(response.body).toEqual(errorResponse);
        });

        it("Should return the new store on successful creation", async()=>{
            const body = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            const response = await request(server).post("/pet-stores").send(body);

            expect(response.body).toEqual(body);
        });
    })
});