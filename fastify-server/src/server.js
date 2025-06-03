// server.js
import Fastify from 'fastify';
import dotenv from 'dotenv';
//plugins
import RegisterCors from './plugins/cors.js';
import RegisterMssql from './plugins/RegisterMssql.js';
//routes
import paypalRoutes from './routes/paypal.routes.js';
import productRoutes from './routes/product.routes.js';
import shopRoutes from './routes/shop.routes.js';

const start = async () => {
  dotenv.config();
  const fastify = Fastify({ logger: true }); 
  try { 
    // plugins
    await RegisterCors(fastify);
    
   await fastify.register(RegisterMssql);
    // routes
    await fastify.register(paypalRoutes);
    await fastify.register(productRoutes);
    await fastify.register(shopRoutes);

    await fastify.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

