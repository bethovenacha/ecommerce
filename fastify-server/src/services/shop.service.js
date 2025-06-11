import sql from 'mssql';

// services/product.service.js
export const getByShopId = async (pool, id) => {
  if (!pool) throw new Error("MSSQL connection is undefined");

  const request = pool.request();
  request.input('shopId', sql.UniqueIdentifier, id);

   const result = await request.query(`
    SELECT * FROM shop WHERE id = @shopId
  `);

    return result.recordset; // the actual data rows
};

// services/product.service.js
export const getByProductId = async (pool, id) => {
  if (!pool) throw new Error("MSSQL connection is undefined");

  const request = pool.request();
  request.input('productId', sql.UniqueIdentifier, id);

   const result = await request.query(`
    SELECT shop.* FROM shop
    LEFT JOIN products ON products.shopId = shop.id
    WHERE products.id = @productId
  `);

    return result.recordset; // the actual data rows
};
  