const express = require("express");
const puppeteer = require("puppeteer");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "rendertron.log" }),
  ],
});

const PORT = process.env.PORT || 3000;

const excludedPaths = [
  "/login",
  "/register",
  "/auth/google",
  "/auth/google/callback",
  "/restore",
];

app.get("/render", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    logger.error("Missing URL parameter");
    return res.status(400).send("URL parameter required");
  }
  if (excludedPaths.some((path) => url.includes(path))) {
    logger.info(`Skipping rendering for excluded URL: ${url}`);
    return res.status(200).send("");
  }
  await renderPage(url, res);
});

app.get("/render/:url(*)", async (req, res) => {
  const url = req.params.url;
  if (!url) {
    logger.error("Missing URL parameter");
    return res.status(400).send("URL parameter required");
  }
  if (excludedPaths.some((path) => url.includes(path))) {
    logger.info(`Skipping rendering for excluded URL: ${url}`);
    return res.status(200).send("");
  }
  await renderPage(url, res);
});

async function renderPage(url, res) {
  try {
    logger.info(`Starting render for URL: ${url}`);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "stylesheet", "font"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    const content = await page.content();
    await browser.close();
    logger.info(`Successfully rendered URL: ${url}`);
    res.send(content);
  } catch (error) {
    logger.error(`Error rendering URL: ${url}, Error: ${error.message}`);
    res.status(500).send(`Page rendering error: ${error.message}`);
  }
}

app.get("/_ping", (req, res) => {
  logger.info("Ping request received");
  res.send("OK");
});

app.listen(PORT, () => {
  logger.info(`Rendertron started on port ${PORT}`);
});
