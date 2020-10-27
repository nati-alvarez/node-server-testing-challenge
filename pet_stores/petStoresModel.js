const db = require("../data/db");

module.exports = {
    getAll
};

function getAll(){
    return db("Pet_Store");
}