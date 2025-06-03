// routes/product.routes.js
import {handleGetShopById } from '../controller/shop.controller.js';

export default async function shopRoutes(fastify) {
  fastify.get('/api/shop/:shopId', handleGetShopById);
}
