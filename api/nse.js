export default function handler(req, res) {
  res.status(200).json({
    status: "API WORKING",
    source: "vercel",
    time: new Date().toISOString()
  });
}
