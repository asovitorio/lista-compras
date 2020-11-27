var bcrypt = require('bcryptjs');
require('dotenv').config()
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('usuarios').del()
        .then(function() {
            // Inserts seed entries
            return knex('usuarios').insert([{
                id: 1,
                nome: 'Administrador',
                usuario: process.env.LOGIN_USER,
                senha: bcrypt.hashSync(process.env.LOGIN_PASS, 10)
            }, ]);
        });
};