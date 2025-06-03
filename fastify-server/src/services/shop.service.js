import sql from 'mssql';

// services/product.service.js
export const getShopById = async (pool, id) => {
  if (!pool) throw new Error("MSSQL connection is undefined");

  const request = pool.request();
  request.input('shopId', sql.UniqueIdentifier, id);

   const result = await request.query(`
    SELECT * FROM shop WHERE id = @shopId
  `);

    return result.recordset; // the actual data rows
};
  