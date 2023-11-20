export const calculateExchangeRate = (amountInNaira, rate) => {
  const convertedRate = Number(amountInNaira) / Number(rate);
  return convertedRate.toFixed(2);
};
