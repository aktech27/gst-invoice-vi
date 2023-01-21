const hbs = require("handlebars");
const numToWords = require("./numToWords");
hbs.registerHelper("sno", (index) => index + 1);
hbs.registerHelper("num2words", (i) => {
  return numToWords(i).toUpperCase();
});

module.exports = async (hbsTemplate, data) => {
  return hbs.compile(hbsTemplate)(data);
};
