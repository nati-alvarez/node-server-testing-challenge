
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pet_Store').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Pet_Store').insert([
        {name: "Petco", address: "!23 Place Ln", specialty: "Pet Grooming"}
      ]);
    });
};
