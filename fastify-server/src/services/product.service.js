import sql from 'mssql';

// services/product.service.js
export const getProductsByShopId = async (pool, id) => {
  if (!pool) throw new Error("MSSQL connection is undefined");

  const request = pool.request();
  request.input('shopId', sql.UniqueIdentifier, id);

   const result = await request.query(`
    SELECT * FROM Products WHERE ShopId = @shopId
  `);

    return result.recordset; // the actual data rows
};
  
export const getProductById = async (mysql, id) => {
  const [rows] = await mysql.query('SELECT * FROM product WHERE id = ?', [id]);
  return rows.map(row => {
    Object.keys(row).forEach(key => {
      if (Buffer.isBuffer(row[key])) {
        row[key] = row[key].toString('base64');
      }
    });
    return row;
  });
};
  