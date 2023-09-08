import {NextFunction, Request, Response} from "express";
import {logger} from "../logger/logger";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

export const returnTimestamp = async () => {
  const currentDate = new Date();
  currentDate.setDate(1);
  currentDate.setHours(0, 0, 0, 0);

  // Get the timestamp for the first day of the current month
  const timestamp = Math.floor(currentDate.getTime() / 1000);

  return timestamp;
};

const crawlForAppointmet = async (url: string) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Open a new page
    const customHeaders = {
      "User-Agent": `Chrome/Version 116.0.5845.140  AppointmentBookingTool/1.1 ${process.env.USER_MAIL} ${process.env.USER_ID}`,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Upgrade-Insecure-Requests": "1",
      "Accept-Language": "en-gb",
      "Accept-Encoding": "gzip, deflate",
      Connection: "keep-alive",
    };

    // Set custom headers for the page
    await page.setExtraHTTPHeaders(customHeaders);

    // Navigate to the URL
    await page.goto(url, {waitUntil: "domcontentloaded"});

    const html = await page.evaluate(() => document.body.innerHTML);

    // Close the browser
    await browser.close();
    return html;
  } catch (error) {
    logger.error(error);
    throw new Error("Can't get metadata");
  }
};

// export const crawlFirstMonthTwo = async (req: Request, res: Response) => {
//   const timestamp = await returnTimestamp();
//   const browser = await puppeteer.launch();

//   // Open a new page
//   const page = await browser.newPage();
//   const customHeaders = {
//     Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//     "Upgrade-Insecure-Requests": "1",
//     "User-Agent": `Chrome/116.0.5845.140  AppointmentBookingTool/1.1 (${process.env.USER_MAIL}; ${process.env.SCRIPT_ID})`,
//     "Accept-Language": "en-gb",
//     "Accept-Encoding": "gzip, deflate",
//     Connection: "keep-alive",
//   };
//   console.log(customHeaders);
//   // Set custom headers for the page
//   await page.setExtraHTTPHeaders(customHeaders);

//   // Navigate to the URL
//   await page.goto(
//     `https://service.berlin.de/terminvereinbarung/termin/day/${timestamp}`,
//     {
//       waitUntil: "domcontentloaded",
//     }
//   );

//   const html = await page.evaluate(() => document.body.innerHTML);

//   const $ = cheerio.load(html);

//   // const promises: Promise<string>[] = [];
//   $(".zms").each((index, element) => {
//     const htmlContent = $(element).html();
//     console.log("HTML content inside element:");
//     console.log(htmlContent);
//     // console.log("elements!!!!!!!!");
//     // console.log(element);
//     // const link = $(element).find("title").text();
//     // console.log("links!!!!!!!!");
//     // console.log(link);
//   });
//   await browser.close();
//   return res.status(200);
// };

export const crawlFirstMonth = async (req: Request, res: Response) => {
  try {
    const timestamp = await returnTimestamp();
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();
    const customHeaders = {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": `Mozilla/5.0   AppointmentBookingTool/1.1 (${process.env.URL}; ${process.env.USER_MAIL}; ${process.env.SCRIPT_ID})`,
      "Accept-Language": "en-gb",
      "Accept-Encoding": "gzip, deflate",
      Connection: "keep-alive",
    };

    // Set custom headers for the page
    await page.setExtraHTTPHeaders(customHeaders);

    // Navigate to the URL
    await page.goto(
      `https://service.berlin.de/terminvereinbarung/termin/day/${timestamp}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    const html = await page.evaluate(() => document.body.innerHTML);

    // Close the browser
    await browser.close();

    const $ = cheerio.load(html);
    // buchbar
    $(".zms").each((index, element) => {
      const htmlContent = $(element).html();
      console.log("HTML content inside element:");
      console.log(htmlContent);
      // Add your scraping logic here
    });

    return res.status(200).send("Scraping completed successfully");
  } catch (error) {
    console.error("Error while scraping:", error);
    return res.status(500).send("Internal Server Error");
  }
};
