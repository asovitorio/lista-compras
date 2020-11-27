exports.up = async function(knex) {
    return knex.schema
        .createTable('lista_produtos', await
            function(table) {
                table.increments('id');

                table.integer('lista_id').unsigned().notNullable();
                table.foreign('lista_id').references('id').inTable('listas').onDelete("CASCADE")

                table.integer('produto_id').unsigned().notNullable();
                table.foreign('produto_id').references('id').inTable('produtos').onDelete("CASCADE")

                table.decimal('quantidade', 8, 2).notNullable();
                table.decimal('valor', 8, 2).notNullable();

                table.boolean('status').notNullable().defaultTo(false);

                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            })
};

exports.down = function(knex) {
    return knex.schema.dropTable('lista_produtos')
};