import fastifyMysql from '@fastify/mysql';
import 'dotenv/config';

export default async function (fastify) {
  fastify.register(fastifyMysql, {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    promise: true,
  });
}
