exports.up = function(knex) {
    return knex.schema.createTable('tickets', table => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('status').notNullable();
        table.datetime('date').notNullable();
        table.integer('user_id').notNullable().references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tickets');
};