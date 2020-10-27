const db = require("../data/db");
const petStoresModel = require("./petStoresModel");

describe("pet stores model", ()=>{
    describe("getAll", ()=>{
        it("Should return an array of pet stores", async()=>{
            const stores = await petStoresModel.getAll();
            expect(Array.isArray(stores)).toEqual(true);
        });
    })
})