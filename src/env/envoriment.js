import dotenv from "dotenv";

dotenv.config();

export const envoriment = {
  appPort: process.env.APP_PORT || 3000,
  apiKey: process.env.API_KEY,
  exchangeUrl: process.env.EXCHANGE_URL,
  apiCoingeckoUrl: process.env.API_COINGEKO_URL,
};
