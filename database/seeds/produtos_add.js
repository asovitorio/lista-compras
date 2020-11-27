exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('produtos').del()
        .then(function() {
            // Inserts seed entries
            return knex('produtos').insert([
                { descricao: 'Arroz', categoria_id: 1 },
                { descricao: 'Feijão', categoria_id: 1 },
                { descricao: 'Sabão em Pó', categoria_id: 3 },
                { descricao: 'Leite', categoria_id: 2 }
            ]);
        });
};