import { handleGetBuyersWithOrders } from '../controller/buyer.controller.js';

export default async function productRoutes(fastify) {
  fastify.get('/buyers', handleGetBuyersWithOrders);
}