// routes/product.routes.js
import { GetProductByProductId, handleGetProductsByShopId } from '../controller/product.controller.js';

export default async function productRoutes(fastify) {
  fastify.get('/api/product/shop/:shopId', handleGetProductsByShopId);
  fastify.get('/api/product/:productId', GetProductByProductId);
}
