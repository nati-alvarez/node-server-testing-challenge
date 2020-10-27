const db = require("../data/db");
const petStoresModel = require("./petStoresModel");

describe("pet stores model", ()=>{
    beforeEach(async()=>{
        await db("Pet_Store").truncate();
    });

    describe("getAll", ()=>{
        it("Should return an array of pet stores", async()=>{
            const stores = await petStoresModel.getAll();
            expect(Array.isArray(stores)).toEqual(true);
        });

        it("Should contain objects representing pet stores", async()=>{
            const store = {id: 1, name: "Petco", address: "123 Place Ln", specialty: "Pet grooming"};
            await db("Pet_Store").insert(store);
            const stores = await petStoresModel.getAll();
            expect(stores[0]).toEqual(store);
        });

        it("Should have length of 1", async()=>{
            const store = {id: 1, name: "Petco", address: "123 Place Ln", specialty: "Pet grooming"};
            await db("Pet_Store").insert(store);
            const stores = await petStoresModel.getAll();
            expect(stores.length).toEqual(1);
        })
    });

    describe("addStore", ()=>{
        it("Should increase number of stores in db by 1", async()=>{
            const newStore = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            await petStoresModel.addStore(newStore);
            const stores = await db("Pet_Store");
            expect(stores.length).toEqual(1);
        });
    })
})