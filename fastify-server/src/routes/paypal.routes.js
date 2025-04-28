// routes/paypal.routes.js
import { handleCreateOrder, handleCaptureOrder,getToken } from "../controller/paypal.controller.js"; 

export default async function paypalRoutes(fastify) {
  fastify.post('/getAccessToken',getToken);
  //fastify.post('/api/orders', handleCreateOrder);
  //fastify.post('/api/orders/:orderID/capture', handleCaptureOrder);
}
