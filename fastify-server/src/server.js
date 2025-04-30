// server.js
import Fastify from 'fastify';
//plugins

import mysql from './plugins/mysql.js';
import cors from './plugins/cors.js';
//routes
import paypalRoutes from './routes/paypal.routes.js';
import productRoutes from './routes/product.routes.js';
import dotenv from 'dotenv';

const start = async () => {
  try {
    dotenv.config();

    const fastify = Fastify({ logger: true });  
    // plugins
    await fastify.register(cors);
    await fastify.register(mysql);

    // routes
    await fastify.register(paypalRoutes);
    await fastify.register(productRoutes);

    await fastify.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

