let transactions = [];
let totalSavings = 0;

document.getElementById('transactionForm').addEventListener('submit', addTransaction);

function addTransaction(event) {
  event.preventDefault();

  const description = document.getElementById('transactionDescription').value.trim();
  const amount = parseFloat(document.getElementById('transactionAmount').value);
  const type = document.getElementById('transactionType').value;

  // Validation
  if (!description || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  // Create a new transaction object
  const transaction = {
    id: Date.now(),
    description,
    amount: type === 'income' ? amount : -amount, // Income adds, expense subtracts
    type
  };

  // Add to the transactions list
  transactions.push(transaction);
  updateTotalSavings();
  renderTransactions();
  calculateInterest();

  // Clear form fields
  document.getElementById('transactionForm').reset();
}

function updateTotalSavings() {
  totalSavings = transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

function renderTransactions() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `${transaction.description}: $${Math.abs(transaction.amount).toFixed(2)} (${transaction.type})`;
    transactionList.appendChild(listItem);
  });
}

function calculateInterest() {
  const interestRate = 0.03; // 3%
  const interestEarned = totalSavings * interestRate;
  document.getElementById('interestEarned').innerText = `$${interestEarned.toFixed(2)}`;
  updateChart();
}

// Chart setup
const ctx = document.getElementById('savingsChart').getContext('2d');
let savingsChart;

function updateChart() {
  const monthlyData = calculateMonthlySavings();
  
  if (savingsChart) {
    savingsChart.destroy(); // Destroy the previous chart
  }

  savingsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: monthlyData.labels,
      datasets: [{
        label: 'Savings Over Time',
        data: monthlyData.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function calculateMonthlySavings() {
  const labels = [];
  const values = [];
  const months = Array.from({ length: 12 }, (_, i) => new Date(new Date().setMonth(i)).toLocaleString('default', { month: 'long' }));

  months.forEach((month) => {
    labels.push(month);
    const monthlyTotal = transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.id);
      return transactionDate.toLocaleString('default', { month: 'long' }) === month ? total + transaction.amount : total;
    }, 0);
    
    // Calculate interest for the month
    const interest = monthlyTotal * 0.03; // 3% interest on the total
    values.push(monthlyTotal + interest);
  });

  return { labels, values };
}
