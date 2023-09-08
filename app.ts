import app from "./src/index";
import {logger} from "./src/logger/logger";
import * as https from "https"; // Use named import for "https"
import * as fs from "fs"; // Use named import for "fs"

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || "development";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

declare var fetch: any;

if (process.env.SERVER) {
  // Creating object of key and certificate
  // for SSL.
  const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    passphrase: process.env.PASSPHRASE,
  };

  // Creating https server by passing
  // options and app object
  https.createServer(options, app).listen(process.env.PORT, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${process.env} =======`);
    logger.info(`🚀 App listening on the port ${process.env.PORT}`);
    logger.info(`=================================`);
  });
} else if (process.env.LOCAL) {
  app.listen(process.env.PORT, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${process.env} =======`);
    logger.info(`🚀 App listening on the port ${process.env.PORT}`);
    logger.info(`=================================`);
  });
} else {
  app.listen(process.env.PORT, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${process.env} =======`);
    logger.info(`🚀 App listening on the port ${process.env.PORT}`);
    logger.info(`=================================`);
  });
}
