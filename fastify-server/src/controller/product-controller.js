
const productController = (fastify,options, done) =>{

  //get top 3 product based on saleCount
  fastify.get('/product', async (req,reply)=>{
    try {
      const [result] = await fastify.mysql.query('SELECT * FROM product ORDER BY saleCount DESC LIMIT 3');
      // If the result contains binary data, handle it accordingly
        const processedResult = result.map(row => {
          // Example: Convert any buffer columns to base64
          Object.keys(row).forEach(key => {
            if (Buffer.isBuffer(row[key])) {
              row[key] = row[key].toString('base64'); // or any other appropriate conversion
            }
          });
          return row;
        });
      reply.send(processedResult);
    } catch (error) {
      reply.send(error);
    }
    done();
  });
    //get product by id
    fastify.get('/product/:id',async (req,reply)=>{
        try {
            const [result] = await fastify.mysql.query(
              'SELECT * FROM product WHERE id = ?', [req.params.id]
            );
            // If the result contains binary data, handle it accordingly
            const processedResult = result.map(row => {
                // Example: Convert any buffer columns to base64
                Object.keys(row).forEach(key => {
                  if (Buffer.isBuffer(row[key])) {
                    row[key] = row[key].toString('base64'); // or any other appropriate conversion
                  }
                });
                return row;
              });
            reply.send(processedResult);
          } catch (err) {
            reply.send(err);
          }     
    });
    done();
};

export default productController;