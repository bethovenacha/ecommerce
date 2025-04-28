// services/product.service.js
export const getTopProducts = async (mysql) => {
    const [rows] = await mysql.query('SELECT * FROM product ORDER BY saleCount DESC LIMIT 3');
    return rows.map(row => {
      Object.keys(row).forEach(key => {
        if (Buffer.isBuffer(row[key])) {
          row[key] = row[key].toString('base64');
        }
      });
      return row;
    });
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
  