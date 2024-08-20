const supportedCurrencies = [
  {
    code: "USD",
    name: "United States Dollar",
    type: "fiat", // Tipo da moeda: 'fiat' (fiduciária), 'crypto' (criptomoeda), 'fictional' (fictícia)
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    type: "fiat",
  },
  {
    code: "EUR",
    name: "Euro",
    type: "fiat",
  },
  {
    code: "BTC",
    name: "Bitcoin",
    type: "crypto",
  },
  {
    code: "ETH",
    name: "Ethereum",
    type: "crypto",
  },
  {
    code: "HURB",
    name: "Hurb Coin",
    type: "fictional",
    conversionRate: {
      base: "BRL", // Base para conversão, por exemplo, BRL
      rate: 10, // Quantos BRLs valem 1 HURB
    },
  },
  {
    code: "GTA$",
    name: "GTA Dollar",
    type: "fictional",
    conversionRate: {
      base: "BRL",
      rate: 0.0000668, // Exemplo de cotação fictícia: 1 GTA$ = 0.0000668 BRL
    },
  },
];

// Função para adicionar uma nova moeda ao array de moedas suportadas
const addCurrency = (currency) =>{
  supportedCurrencies.push(currency);
}

// Função para remover uma moeda pelo código
const removeCurrency =(code) =>{
  const index = supportedCurrencies.findIndex(
    (currency) => currency.code === code,
  );
  if (index !== -1) {
    supportedCurrencies.splice(index, 1);
  }
}

// Função para buscar uma moeda pelo código
const getCurrencyByCode =(code) =>{
  return supportedCurrencies.find((currency) => currency.code === code);
}

// Exportando funções e a lista de moedas
export const supportedCurrenciesModel = {
  supportedCurrencies,
  addCurrency,
  removeCurrency,
  getCurrencyByCode,
};
