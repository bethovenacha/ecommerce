// controllers/product.controller.js
import { getProductsByShopId, getProductByProductId } from '../services/product.service.js';

export const handleGetProductsByShopId = async (req, reply) => {
  try {
    const shopId = req.query.shopId;
    if(!shopId){
       return reply.code(400).send({ error: 'Missing shopId' });
    }
    const pool = req.server.mssql;

    const result = await getProductsByShopId(pool, String(shopId));
    reply.send(result);
  } catch (error) {
    console.error('handleGetProductsByShopId failed:', error);
    reply.code(500).send({ error: error.message });
  }
};

export const GetProductByProductId = async (req, reply) => {
  try {
    let productId = req.query.productId;
    if(!productId){
       return reply.code(400).send({ error: 'Missing productId' });
    }
    const pool = req.server.mssql;

    const result = await getProductByProductId(pool, String(productId));
    reply.send(result);
  } catch (error) {
    console.error('GetProductByProductId  failed:', error);
    reply.code(500).send({ error: error.message });
  }
};
