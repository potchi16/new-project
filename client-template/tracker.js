// Transaction data structure
let transactions = [];
let currentBalance = 0;

document.getElementById('transactionForm').addEventListener('submit', addTransaction);

function addTransaction(event) {
  event.preventDefault(); // Prevent form from refreshing the page

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
  updateBalance();
  renderTransactions();

  // Clear form fields
  document.getElementById('transactionForm').reset();
}

function updateBalance() {
  // Calculate the total balance
  currentBalance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
  document.getElementById('currentBalance').innerText = `$${currentBalance.toFixed(2)}`;
}

function renderTransactions() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = ''; // Clear the list

  transactions.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'transaction-item');

    // Description and amount
    const transactionDetails = document.createElement('div');
    transactionDetails.innerHTML = `
      <span class="description">${transaction.description}</span>
      <span class="amount ${transaction.amount < 0 ? 'text-danger' : 'text-success'}">
        $${Math.abs(transaction.amount).toFixed(2)}
      </span>
    `;
    
    // Actions (Edit/Delete)
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editTransaction(transaction.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteTransaction(transaction.id));

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    listItem.appendChild(transactionDetails);
    listItem.appendChild(actionsDiv);

    transactionList.appendChild(listItem);
  });
}

function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    const newDescription = prompt('Edit description:', transaction.description);
    const newAmount = parseFloat(prompt('Edit amount:', Math.abs(transaction.amount)));
    const newType = prompt('Edit type (income/expense):', transaction.type);

    if (newDescription && !isNaN(newAmount) && (newType === 'income' || newType === 'expense')) {
      transaction.description = newDescription;
      transaction.amount = newType === 'income' ? newAmount : -newAmount;
      transaction.type = newType;
      updateBalance();
      renderTransactions();
    } else {
      alert('Invalid input');
    }
  }
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateBalance();
  renderTransactions();
}
