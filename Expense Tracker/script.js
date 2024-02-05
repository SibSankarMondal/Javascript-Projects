// Targeting Elements
let transactions = document.querySelector("#transactions");
let balance = document.querySelector("#balance");
let submitbtn = document.querySelector("#submit");
let history = [];

// Load data from localStorage on window load
window.addEventListener('load', () => {
  let savedHistory = JSON.parse(localStorage.getItem('items'));
  if (savedHistory) {
    history = savedHistory;
    updateTransactionList();
    updateTotalExpenses();
  }
});

submitbtn.addEventListener('click', () => {
  let itemName = document.querySelector("#text-value").value.trim();
  let itemAmount = parseInt(document.querySelector("#amount-value").value);

  const dataObject = {
    description: itemName,
    amount: itemAmount
  };
  history.push(dataObject);

  if (itemName.length && !isNaN(itemAmount)) {
    updateTransactionList();
  }

  updateTotalExpenses();

  localStorage.setItem('items', JSON.stringify(history));

  // Clear the input field for the next entry
  document.getElementById('text-value').value = '';
  document.getElementById('amount-value').value = '';
});

// removeitem
transactions.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = Array.from(transactions.children).indexOf(e.target.parentElement);
    e.target.parentElement.remove();
    history.splice(index, 1);
  }
  updateTotalExpenses();
  localStorage.setItem('items', JSON.stringify(history));
});

// totalamountofexpenses
function updateTotalExpenses() {
  let totalSum = history.reduce((accu, curr) => {
    return accu + curr.amount;
  }, 0);
  balance.innerHTML = totalSum;
}

// Update transaction list
function updateTransactionList() {
  let template = history.map(item => `
    <li class="items"> 
      <span class="left">${item.description}</span> 
      <span class="right">${item.amount}</span> 
      <span class="delete fa-solid fa-xmark"></span>
    </li>
  `).join('');

  transactions.innerHTML = template;
}
 