// api/nse.js
export default function handler(req, res) {
  res.status(200).json({
    status: "API WORKING",
    time: new Date().toISOString()
  });
}
