import { getByShopId,getByProductId } from '../services/shop.service.js';

export const GetShopByShopId = async (req, reply) => {
  try {
    const id = req.query.shopId;
    if(!id){
       return reply.code(400).send({ error: 'Missing shopId' });
    }
    const pool = req.server.mssql;
    const result = await getByShopId(pool, String(id));
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

export const GetShopByProductId = async (req, reply) => {
  try {
    const id = req.query.productId;
    if(!id){
       return reply.code(400).send({ error: 'Missing shopId' });
    }
    const pool = req.server.mssql;
    const result = await getByProductId(pool, String(id));
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};