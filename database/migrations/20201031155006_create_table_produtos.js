exports.up = async function(knex) {
    return knex.schema
        .createTable('produtos', await
            function(table) {
                table.increments('id');
                table.string('descricao', 255).notNullable();
                table.integer('categoria_id').unsigned().notNullable();
                table.foreign('categoria_id').references('id').inTable('categorias').onDelete("CASCADE")
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos')
};