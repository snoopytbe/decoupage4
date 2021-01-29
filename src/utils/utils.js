export const NumberToEuro = (value) => {
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
};

export const EuroToNumber = (value) => {
  return parseFloat(value.replaceAll(" ",""))
};
