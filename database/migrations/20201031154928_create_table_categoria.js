    exports.up = function(knex) {
        return knex.schema
            .createTable('categorias', function(table) {
                table.increments('id');
                table.string('nome', 255).notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            })
    };

    exports.down = function(knex) {
        return knex.schema.dropTable('categorias')
    };