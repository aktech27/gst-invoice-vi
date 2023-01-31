const puppeteer = require("puppeteer");

const generatePDF = async (html, billNo, type = "Invoice") => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    format: "A4",
    margin: {
      top: 10,
      bottom: 10,
      left: 20,
      right: 20,
    },
    path: `${process.cwd()}/output/${type}-${billNo}.pdf`,
  });
  await browser.close();
};

module.exports = generatePDF;
