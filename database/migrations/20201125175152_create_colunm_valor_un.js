exports.up = async function(knex) {
    return knex.schema.table('lista_produtos', await
        function(table) {
            table.decimal('valor_un', 8, 2).after('quantidade').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema.table('lista_produtos',
        function(table) {
            table.dropColumn('valor_un')
        })
};