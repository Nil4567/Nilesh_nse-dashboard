// /api/nse-data.js

export default async function handler(req, res) {
  try {
    // Example using MarketStack or similar third-party API
    const API_KEY = process.env.MARKET_API_KEY;
    const symbols = "NIFTYBEES,GOLDBEES";  // example ETF tickers
    const url = `https://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${symbols}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data" });
    }

    const json = await response.json();
    // send back appropriate JSON
    res.status(200).json(json.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
