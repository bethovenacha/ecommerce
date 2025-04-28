// controllers/product.controller.js
import { getTopProducts, getProductById } from '../services/product.service.js';

export const handleGetTopProducts = async (req, reply) => {
  try {
    const result = await getTopProducts(req.server.mysql);
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
