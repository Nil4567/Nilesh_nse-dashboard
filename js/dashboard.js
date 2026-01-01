const API_URL = "/api/etf";

async function loadData() {
  checkAuth();
  const tbody = document.getElementById("etfBody");
  tbody.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    tbody.innerHTML = "";
    data.data.forEach(etf => {
      const cls = etf.change >= 0 ? "green" : "red";
      tbody.innerHTML += `
        <tr>
          <td>${etf.symbol}</td>
          <td>${etf.lastPrice}</td>
          <td class="${cls}">${etf.change}</td>
          <td class="${cls}">${etf.pChange}%</td>
        </tr>
      `;
    });
  } catch {
    tbody.innerHTML = "<tr><td colspan='4'>Data unavailable</td></tr>";
  }
}
