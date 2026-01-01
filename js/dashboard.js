const tableBody = document.querySelector('#nseTable tbody');
const refreshBtn = document.getElementById('refreshBtn');

// Fetch NSE data from serverless function
async function fetchNSEData() {
  tableBody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  try {
    const response = await fetch('/api/nse-data');

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (!data || data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4">No data available</td></tr>';
      return;
    }

    tableBody.innerHTML = '';
    data.forEach(stock => {
      const price = Number(stock.price || stock.last_price || 0);
      const change = Number(stock.change || 0);
      const percentChange = Number(stock.percent_change || 0);

      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${stock.symbol || ''}</td>
        <td>₹${price.toLocaleString('en-IN')}</td>
        <td class="${change >= 0 ? 'gain' : 'loss'}">${change.toFixed(2)}</td>
        <td class="${percentChange >= 0 ? 'gain' : 'loss'}">${percentChange.toFixed(2)}%</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="4">Error: ${err.message}</td></tr>`;
  }
}

// Initial load
fetchNSEData();

// Refresh button
refreshBtn.addEventListener('click', fetchNSEData);
