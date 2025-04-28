// routes/product.routes.js
import { handleGetTopProducts, handleGetProductById } from '../controller/product.controller.js';

export default async function productRoutes(fastify) {
  fastify.get('/product', handleGetTopProducts);
  fastify.get('/product/:id', handleGetProductById);
}
