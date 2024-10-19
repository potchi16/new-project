document.getElementById('withdrawForm').addEventListener('submit', handleWithdraw);

function handleWithdraw(event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Get the form values
  const accountNumber = document.getElementById('accountNumber').value;
  const withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
  let balance = parseFloat(document.getElementById('balance').value);

  // Check if the account number is valid
  if (!accountNumber) {
    showMessage('Please enter a valid account number.', 'danger');
    return;
  }

  // Check if the withdraw amount is valid
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    showMessage('Please enter a valid withdrawal amount.', 'danger');
    return;
  }

  // Check if there are sufficient funds
  if (withdrawAmount > balance) {
    showMessage('Insufficient funds. Your current balance is $' + balance + '.', 'danger');
    return;
  }

  // Perform the withdrawal
  balance -= withdrawAmount;

  // Update the balance field
  document.getElementById('balance').value = balance.toFixed(2);

  // Display success message
  showMessage('Withdrawal of $' + withdrawAmount + ' was successful. Your new balance is $' + balance + '.', 'success');

  // Clear the form fields (optional)
  document.getElementById('accountNumber').value = '';
  document.getElementById('withdrawAmount').value = '';
}

// Function to show success or error messages
function showMessage(message, type) {
  const resultMessage = document.getElementById('resultMessage');
  resultMessage.innerHTML = `<div class="alert alert-${type}">${message}</div>`;

  // Auto-hide the message after 5 seconds
  setTimeout(() => {
    resultMessage.innerHTML = '';
  }, 5000);
}
