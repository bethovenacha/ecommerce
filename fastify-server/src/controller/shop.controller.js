import { getShopById } from '../services/shop.service.js';

export const handleGetShopById = async (req, reply) => {
  try {
    const shopId = req.query.shopId;
    if(!shopId){
       return reply.code(400).send({ error: 'Missing shopId' });
    }
    const pool = req.server.mssql;
    const result = await getShopById(pool, String(shopId));
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};