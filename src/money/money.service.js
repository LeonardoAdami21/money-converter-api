import { moneyUtils } from "../utils/money.utils.js";
import { moneyRepository } from "./repositories/money.repository.js";

const convertCurrency = async (from, to, amount) => {
  const fromCurrency = moneyRepository.findCurrencyByCode(from.toUpperCase());
  const toCurrency = moneyRepository.findCurrencyByCode(to.toUpperCase());

  if (!fromCurrency || !toCurrency) {
    throw new Error("Currency not supported");
  }

  let fromRate, toRate;

  if (fromCurrency.type === "fiat") {
    const rates = await moneyUtils.getFiatExchange();
    fromRate = rates[fromCurrency.code];
  } else if (fromCurrency.type === "crypto") {
    fromRate = await moneyUtils.getCryptoExchange(
      fromCurrency.code.toLowerCase(),
    );
  } else {
    fromRate = fromCurrency.coversionRate?.rate || 1;
  }

  if (toCurrency.type === "fiat") {
    const rates = await moneyUtils.getFiatExchange();
    toRate = rates[toCurrency.code];
  } else if (toCurrency.type === "crypto") {
    toRate = await moneyUtils.getCryptoExchange(
      toCurrency.code.toLocaleLowerCase(),
    );
  } else {
    toRate = toCurrency.coversionRate?.rate || 1;
  }
  const convertedAmount = (amount * fromRate) / toRate;
  return convertedAmount;
};

const createCurrency = async (currency) => {
  try {
    const newCurrency = await moneyRepository.create(currency);
    return newCurrency;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const findCurrencyByCode = async (code) => {
  try {
    const currency = await moneyRepository.findCurrencyByCode(code);
    if (!currency) {
      throw new Error("Currency not found");
    }
    return currency;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const removeCurrency = async (code) => {
  try {
    const currency = await moneyRepository.remove(code);
    if (!currency) {
      throw new Error("Currency not found");
    }
    return currency;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getAllCurrencies = async () => {
  try {
    const currencies = await moneyRepository.findAll();
    return currencies;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

export const moneyService = {
  convertCurrency,
  createCurrency,
  findCurrencyByCode,
  removeCurrency,
  getAllCurrencies,
};
