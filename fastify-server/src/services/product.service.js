import sql from 'mssql';

// services/product.service.js
export const getProductsByShopId = async (pool, id) => {
  if (!pool) throw new Error("MSSQL connection is undefined");

  const request = pool.request();
  request.input('shopId', sql.UniqueIdentifier, id);

   const result = await request.query(`
    SELECT * FROM Products WHERE ShopId = @shopId
  `);

    return result.recordset;
};
  
export const getProductByProductId = async (pool, id) => {
   if (!pool) throw new Error("MSSQL connection is undefined");

  const request = pool.request();
  request.input('productId', sql.UniqueIdentifier, id);

   const result = await request.query(`
    SELECT * FROM Products WHERE id = @productId
  `);

    return result.recordset;
};
  