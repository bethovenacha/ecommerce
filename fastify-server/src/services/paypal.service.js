// services/paypal.service.js
import {
    ApiError,
    CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
  } from '@paypal/paypal-server-sdk';
  import dotenv from 'dotenv';
  import fetch from 'node-fetch';

  dotenv.config();

  const { CLIENT_ID, CLIENT_SECRET, ENDPOINT_URL_SANDBOX } = process.env;
  
  const client = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: CLIENT_ID,
      oAuthClientSecret: CLIENT_SECRET,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
      logLevel: LogLevel.Info,
      logRequest: { logBody: true },
      logResponse: { logHeaders: true },
    },
  });
  
  const ordersController = new OrdersController(client);
  
  export const createOrder = async (cart) => {
    const collect = {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: "100.00",
            },
          },
        ],
      },
      prefer: "return=minimal",
    };
  
    const { body, ...httpResponse } = await ordersController.createOrder(collect);
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  };
  
  export const captureOrder = async (orderID) => {
    const collect = {
      id: orderID,
      prefer: "return=minimal",
    };
  
    const { body, ...httpResponse } = await ordersController.captureOrder(collect);
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  };

  // services/paypal.service.js
export const getAccessToken = async () => {
  const auth = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const encodedAuth = Buffer.from(auth).toString('base64');

  const response = await fetch(`${ENDPOINT_URL_SANDBOX}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedAuth}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal error: ${errorBody}`);
  }

  const data = await response.json();
  return data.access_token;
};


  
  