// api/nse.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Step 1: hit NSE homepage to get cookies
    const homepage = await fetch('https://www.nseindia.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    const cookies = homepage.headers.get('set-cookie') || '';

    // Step 2: fetch ETF data
    const response = await fetch('https://www.nseindia.com/api/etf', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.nseindia.com/market-data/exchange-traded-funds-etf',
        'Connection': 'keep-alive',
        'Cookie': cookies,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Network response was not ok: ${response.status}` });
    }

    const rawData = await response.json();

    // Step 3: format data
    const formattedData = rawData.data.map(etf => ({
      symbol: etf.symbol,
      name: etf.name,
      lastPrice: `₹${Number(etf.lastPrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: Number(etf.change).toFixed(2),
      pChange: Number(etf.pChange).toFixed(2),
      gainLossColor: Number(etf.change) >= 0 ? 'green' : 'red',
    }));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(formattedData);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}
