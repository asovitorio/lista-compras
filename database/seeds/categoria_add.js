exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('categorias').del()
        .then(function() {
            // Inserts seed entries
            return knex('categorias').insert([
                { id: 1, nome: 'Alimentos' },
                { id: 2, nome: 'Bebida' },
                { id: 3, nome: 'Limpeza' }
            ]);
        });
};