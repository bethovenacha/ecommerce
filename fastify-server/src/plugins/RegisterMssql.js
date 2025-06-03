import fp from 'fastify-plugin';
import sql from 'mssql';
import 'dotenv/config';

async function RegisterMssql(fastify) {
    const options = {
        encrypt: true, 
        trustServerCertificate: true,
        instanceName: process.env.DB_INSTANCE
    };
  const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    port: Number(process.env.DB_PORT),
    options
  };

  try {
    const pool = await sql.connect(config);
    fastify.decorate('mssql', pool); // make it available via fastify.mssql
    fastify.log.info('Connected to MSSQL');
  } catch (err) {
    fastify.log.error('MSSQL Connection Error:', err);
    throw err;
  }
}

export default fp(RegisterMssql);
