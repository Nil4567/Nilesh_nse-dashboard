import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.nseindia.com/api/etf', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nseindia.com/'
      }
    });

    const data = await response.json();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}
