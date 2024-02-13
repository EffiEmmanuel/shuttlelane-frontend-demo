export const calculateExchangeRate = (amountInNaira, rate) => {
  const convertedRate = Number(amountInNaira) / Number(rate);
  return convertedRate.toFixed(2);
};

// This function validates input fields
export function validateFields(args) {
  args.forEach((arg) => {
    if (!arg || arg === "") {
      return {
        status: 404,
        message: "Please fill in the missing fields",
      };
    }
  });
}

export function isValidJSON(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
}
