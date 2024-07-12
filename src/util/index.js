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

// This function formats a date into this format -> MM-DD-YYYY assuming the date is in the format YYYY-MM-DD
export function reformatDate(value) {
  const splittedDate = value?.split("T")[0];
  console.log("SPLITTED DATE:", splittedDate);
  const year = splittedDate?.split("-")[0];
  const month = splittedDate?.split("-")[1];
  const day = splittedDate?.split("-")[2];

  const formattedDate = `${month}-${day}-${year}`;

  console.log("FORMATTED DATE:", formattedDate);

  return formattedDate;
}
