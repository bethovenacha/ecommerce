// routes/product.routes.js
import {GetShopByShopId,GetShopByProductId } from '../controller/shop.controller.js';

export default async function shopRoutes(fastify) {
  fastify.get('/api/shop/:shopId', GetShopByShopId);
  fastify.get('/api/shop/product/:productId', GetShopByProductId);
}
