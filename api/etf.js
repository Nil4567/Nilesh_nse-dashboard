export default async function handler(req, res) {
  try {
    // First request to set cookies
    await fetch("https://www.nseindia.com", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html"
      }
    });

    // Actual API request
    const response = await fetch("https://www.nseindia.com/api/etf", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://www.nseindia.com/"
      }
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "NSE fetch failed" });
  }
}
