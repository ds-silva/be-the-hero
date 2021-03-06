const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(resquest, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.ramdomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            city,
            uf,
        })

        return response.json({ id })
    }
};