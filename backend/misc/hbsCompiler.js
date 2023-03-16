const hbs = require("handlebars");
const numToWords = require("./numToWords");

hbs.registerHelper("sno", (index) => index + 1);

hbs.registerHelper("num2words", (i) => {
  return numToWords(i).toUpperCase();
});

hbs.registerHelper("dateFormat", (date) => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-in", options).format(date);
});

hbs.registerHelper("financialYear", (date) => {
  //Till March, falls under previous financial year
  let startYear =
    new Date(date).getMonth() <= 2
      ? new Date(date).getFullYear() - 1
      : new Date(date).getFullYear();
  let endYear = startYear + 1;
  return `${startYear} - ${endYear}`;
});

hbs.registerHelper("extractRS", (number) => parseFloat(number).toFixed(2).split(".")[0]);
hbs.registerHelper("extractP", (number) => parseFloat(number).toFixed(2).split(".")[1]);

hbs.registerHelper("calculateTax", (amount, rate) => {
  return (amount * (rate / 100)).toFixed(2);
});

hbs.registerHelper("calculateTotalTax", (amount, tax) => {
  return (
    amount * (tax.cgst / 100) +
    amount * (tax.sgst / 100) +
    amount * (tax.igst / 100)
  ).toFixed(2);
});

hbs.registerHelper("deliveryAt", (deliveryAt) => {
  if (deliveryAt) {
    return `Delivery At : ${deliveryAt}`;
  }
});

module.exports = async (hbsTemplate, data) => {
  return hbs.compile(hbsTemplate)(data);
};
