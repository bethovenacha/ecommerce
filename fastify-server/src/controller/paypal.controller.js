// controllers/paypal.controller.js
import { createOrder, captureOrder, getAccessToken} from "../services/paypal.service.js"; 

export const getToken = async (req, reply) => {
  try {
    const token = await getAccessToken();
    return reply.send({ access_token: token });
    console.log("=========TOKEN: =================" + token)
  } catch (err) {
    console.error('getToken error:', err);
    return reply.status(500).send({ error: err.message });
  }
};

export const handleCreateOrder = async (req, reply) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    reply.code(httpStatusCode).send(jsonResponse);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

export const handleCaptureOrder = async (req, reply) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    reply.code(httpStatusCode).send(jsonResponse);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};


