import axios from "axios";
import { envoriment } from "../env/envoriment.js";

const getFiatExchange = async () => {
  try {
    const response = await axios.get(envoriment.exchangeUrl, {
      params: {
        app_id: envoriment.apiKey,
      },
    });
    return response.data.rates;
  } catch (error) {
    throw new Error("Error getting exchange rates", error);
  }
};

const getCryptoExchange = async (crypto) => {
  try {
    const response = await axios.get(envoriment.apiCoingeckoUrl, {
      params: {
        ids: crypto,
        vs_currencies: "USD",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error getting exchange rates", error);
  }
};

const getFiatExchangeRate = async (currency) => {
  if (!currency.conversionRate) {
    throw new Error("Conversion rate not found to currency: " + currency.code);
  }
  return currency.conversionRate.rate;
};

export const moneyUtils = {
  getFiatExchange,
  getCryptoExchange,
  getFiatExchangeRate,
};


