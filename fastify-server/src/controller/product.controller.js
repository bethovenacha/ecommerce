// controllers/product.controller.js
import { getProductsByShopId, getProductById } from '../services/product.service.js';

export const handleGetProductsByShopId = async (req, reply) => {
  try {
    const shopId = req.query.shopId;
    console.log('Shop ID:', shopId);
    if(!shopId){
       return reply.code(400).send({ error: 'Missing shopId' });
    }
    const pool = req.server.mssql;

    const result = await getProductsByShopId(pool, String(shopId));
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

export const handleGetProductById = async (req, reply) => {
  try {
    const { id } = req.params;
    const result = await getProductById(req.server.mysql, id);
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
