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

        it("Should insert new store into db", async()=>{
            const newStore = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            await petStoresModel.addStore(newStore);
            const stores = await db("Pet_Store");
            expect(stores[0]).toEqual(newStore);
        });

        it("Should return the newly created store", async()=>{
            const newStore = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            const store = await petStoresModel.addStore(newStore);
            expect(store).toEqual(newStore);
        });
    });
    describe('removeStore', ()=>{
        beforeEach(async()=>{
            const store1 = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            const store2 = {id: 2, name: "Petsense", address: "678 Pet Place", specialty: "Small pets"};
            const store3 = {id: 3, name: "PetSmart", address: "934 Street St", specialty: "Pet food"};
            await db("Pet_Store").insert([store1, store2, store3]);
        });

        it("Should remove only one record from db", async()=>{
            await petStoresModel.removeStore(1);
            const stores = await db("Pet_Store");

            expect(stores).toHaveLength(2);
        });

        it("Should remove the specified store from db", async()=>{
            await petStoresModel.removeStore(1);
            const store = await db("Pet_Store").where({id: 1}).first();
            
            expect(store).toEqual(undefined);
        });

        it("Should return store that was removed", async()=>{
            const expectedStore = {id: 1, name: "Petco", address: '123 Place Ln', specialty: "Pet grooming"};
            const removedStore = petStoresModel.removeStore(1);
            
            expect(removedStore).toEqual(expectedStore);
        });
    });

});