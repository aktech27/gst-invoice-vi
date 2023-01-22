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

module.exports = async (hbsTemplate, data) => {
  return hbs.compile(hbsTemplate)(data);
};
