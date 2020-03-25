const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const ongs = await connection('ongs')
        .join('ongs', 'ongs_id', '=', 'incidents.ong_id')
        .limit(5)
        .offset(page - 1 * 5)
        .select(['incidents.*', 'ong.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    
        response.header('X-Total-Count', count['count(*)']);
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
}