import cors from '@fastify/cors';

export default async function (fastify){
   fastify.register(cors, {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST','PUT','DELETE'],
    });
}
