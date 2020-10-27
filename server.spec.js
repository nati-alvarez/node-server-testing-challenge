const request = require("supertest");
const server = require("./server.js");
const db = require("./data/db");

describe("server.js", ()=>{
    beforeEach(async()=>{
        await db("Pet_Store").truncate();
    });

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
    });

    describe("pet-stores DELETE route", ()=>{
        beforeEach(async()=>{
            await db("Pet_Store").truncate();
            await db("Pet_Store").insert({id: 1, name: "Petco", address: "123 Place Ln", specialty: "Pet grooming"});
        });

        it("Should respond with 200 status code on successful delete", async()=>{
            const response = await request(server).delete("/pet-stores/1");

            expect(response.status).toEqual(200);
        });

        it("Should return success message on successful delete", async()=>{
            const expectedResponse = {message: "Deleted successfully"};
            const response = await request(server).delete("/pet-stores/1");
            console.log(response.status);
            expect(response.body).toEqual(expectedResponse);
            
        });

        it("Should return 400 status code with error message if not given valid id", async()=>{
            //valid ids are integers only
            //strings not coercible to integers and floating point numbers should get this response
            //strings like '4', '2342' are allowed
            const expectedResponse = {message: "Store id not valid"};
            const response = await request(server).delete("/pet-stores/petco");

            expect(response.status).toEqual(400);
            expect(response.body).toEqual(expectedResponse);
        });

        it("Should respond with 404 status code if delete tried on nonexistent store", async()=>{
            const response = await request(server).delete("/pet-stores/38992");

            expect(response.status).toEqual(404);
        });

        it("Should return appropriate error message if delete triend on nonexistent store", async()=>{
            const expectedResponse = {message: "Store does not exist"};
            const response = await request(server).delete("/pet-stores/2340383");

            expect(response.body).toEqual(expectedResponse);
        });
    })
});