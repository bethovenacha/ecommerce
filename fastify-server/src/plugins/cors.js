import cors from '@fastify/cors';

export default async function (fastify){
    fastify.register(cors, {
        origin: (origin, callback) => {
          const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:4200',
            'https://your-production-domain.com'
          ];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // allow
          } else {
            callback(new Error("Not allowed by CORS")); // deny
          }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      });
}

  
