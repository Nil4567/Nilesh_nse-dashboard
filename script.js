const tableBody = document.querySelector('#nseTable tbody');
const refreshBtn = document.getElementById('refreshBtn');

// Function to fetch NSE data from your serverless function
async function fetchNSEData() {
  tableBody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  try {
    // Replace with your actual serverless function URL
    const response = await fetch('/api/nse-data'); 
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4">No data available</td></tr>';
      return;
    }

    tableBody.innerHTML = '';
    data.forEach(stock => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${stock.symbol}</td>
        <td>${stock.price}</td>
        <td>${stock.change}</td>
        <td>${stock.percent_change}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`;
  }
}

// Load data on page load
fetchNSEData();

// Refresh button click
refreshBtn.addEventListener('click', () => {
  fetchNSEData();
});
