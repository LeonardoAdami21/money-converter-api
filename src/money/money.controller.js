import { moneyService } from "./money.service.js";

const convert = async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !isNaN(amount)) {
      return res.status(400).json({
        error: "Missing required parameters or amount is not a number",
      });
    }
    const result = await moneyService.convertCurrency(
      from,
      to,
      parseFloat(amount),
    );
    return res.status(200).json({
      from,
      to,
      amount,
      originalAmount: amount,
      convertedAmount: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { code, name, type, rate } = req.body;

    if (!code || !name || !type) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const newCurrency = await moneyService.createCurrency({
      code: code.toUpperCase(),
      name,
      type,
      conversionRate: rate
        ? { create: { rate: parseFloat(rate), base: code } }
        : undefined,
    });
    return res.status(201).json({ currency: newCurrency });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { code } = req.params;
    const currency = await moneyService.findCurrencyByCode(code);
    if (!currency) {
      return res.status(404).json({ error: "Currency not found" });
    }
    return res.status(204).json({ message: "Currency removed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const currencies = await moneyService.getAllCurrencies();
    return res.status(200).json({ currencies });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const moneyController = {
  convert,
  create,
  remove,
  findAll,
};
