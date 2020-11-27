exports.up = async function(knex) {
    return knex.schema
        .createTable('listas', await
            function(table) {
                table.increments('id');
                table.date('data').notNullable();
                table.integer('usuario_id').unsigned().notNullable();
                table.foreign('usuario_id').references('id').inTable('usuarios').onDelete("CASCADE")
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            })
};

exports.down = function(knex) {
    return knex.schema.dropTable('listas')
};