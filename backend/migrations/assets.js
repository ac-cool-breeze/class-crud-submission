// 20210715100000_migrate.js


exports.up = function(knex) {
    return knex.schema.createTable('assets', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('name');
      table.bigInteger('inges_date');
      table.string('serial').notNullable();
      table.bigInteger('last_inv_date');
      table.boolean('active');
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('assets');
};