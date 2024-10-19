// JavaScript to handle CRUD operations
document.addEventListener("DOMContentLoaded", function () {
    const depositForm = document.getElementById('depositForm');
    const depositTable = document.getElementById('depositTable').getElementsByTagName('tbody')[0];

    // Load existing deposits from localStorage
    let deposits = JSON.parse(localStorage.getItem('deposits')) || [];

    // Function to display deposits
    function displayDeposits() {
        depositTable.innerHTML = '';
        deposits.forEach((deposit, index) => {
            const row = depositTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${deposit.amount}</td>
                <td>${deposit.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editDeposit(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteDeposit(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Function to add deposit
    depositForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const amount = document.getElementById('depositAmount').value;
        const description = document.getElementById('depositDescription').value;

        // Add deposit to array
        deposits.push({ amount, description });

        // Save to localStorage
        localStorage.setItem('deposits', JSON.stringify(deposits));

        // Clear form and update table
        depositForm.reset();
        displayDeposits();
    });

    // Function to edit deposit
    window.editDeposit = function (index) {
        const deposit = deposits[index];
        document.getElementById('depositAmount').value = deposit.amount;
        document.getElementById('depositDescription').value = deposit.description;

        // Remove the deposit being edited
        deleteDeposit(index);
    }

    // Function to delete deposit
    window.deleteDeposit = function (index) {
        deposits.splice(index, 1);
        localStorage.setItem('deposits', JSON.stringify(deposits));
        displayDeposits();
    }

    // Display deposits on load
    displayDeposits();
});
