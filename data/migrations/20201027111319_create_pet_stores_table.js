exports.up = function(knex) {
    return knex.schema.createTable("Pet_Store", table=>{
        table.increments();
        table.string("name").notNullable();
        table.string("address").notNullable().unique();
        table.string("specialty").defaultsTo("N/A");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Pet_Store");
};
