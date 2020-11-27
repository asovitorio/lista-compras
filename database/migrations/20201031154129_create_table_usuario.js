exports.up = function(knex) {
    return knex.schema
        .createTable('usuarios', function(table) {
            table.increments('id');
            table.string('nome', 255).notNullable();
            table.string('usuario', 255).notNullable();
            table.string('senha', 255).notNullable();
            table.boolean('status').notNullable().defaultTo(true);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};