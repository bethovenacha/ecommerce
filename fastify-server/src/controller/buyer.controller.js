import { getBuyersWithOrders } from "../services/buyer.service";

export const handleGetBuyersWithOrders = async (req, reply) => {
  try {
    const result = await getBuyersWithOrders(req.server.mysql);
    reply.send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};