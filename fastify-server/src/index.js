// ESM
import Fastify from 'fastify'
import fastifyMysql from '@fastify/mysql';
import productController from './controller/product-controller.js';
import fastifyCors from '@fastify/cors';

const fastify = Fastify({
  logger: true
});
// Register the CORS plugin
await fastify.register(fastifyCors, {
  
  origin: 'http://localhost:5173', // Allow only your frontend (adjust accordingly)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
});

//Database
fastify.register(fastifyMysql,{
    host:'localhost',
    user:'root',
    password:'2c7gcb414eE~',
    database:'urban_grit_db',
    promise:true
});

//Controller
fastify.register(productController);

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
})