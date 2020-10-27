const db = require("../data/db");

module.exports = {
    getAll,
    addStore
};

function getAll(){
    return db("Pet_Store");
}

async function addStore(store){
    const insertion = await db("Pet_Store").insert(store);
    const newStoreId = insertion[0];

    return db("Pet_Store").where({id: newStoreId}).first();
}