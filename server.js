const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

async function getETFData() {
  // Step 1: Get cookies from NSE homepage
  const homepage = await axios.get("https://www.nseindia.com", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
    },
  });

  const cookies = homepage.headers["set-cookie"];

  // Step 2: Call ETF API with cookies
  const response = await axios.get("https://www.nseindia.com/api/etf", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Accept": "application/json",
      "Referer": "https://www.nseindia.com/market-data/exchange-traded-funds-etf",
      "Accept-Language": "en-US,en;q=0.9",
      "Cookie": cookies.join("; "),
    },
  });

  return response.data;
}

app.get("/api/etf", async (req, res) => {
  try {
    const data = await getETFData();
    res.json(data);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch ETF data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
