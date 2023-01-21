const puppeteer = require("puppeteer");

const generatePDF = async (html, billNo) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "domcontentloaded",
  });

  await page.pdf({
    format: "letter",
    margin: {
      top: 10,
      bottom: 10,
      left: 20,
      right: 20,
    },
    path: `${process.cwd()}/output/Invoice-${billNo}.pdf`,
  });
  await browser.close();
};

module.exports = generatePDF;
