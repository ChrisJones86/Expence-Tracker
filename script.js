var state = {
    balance: 10000,
    income: 400000,
    expence: 1000,
    transactions: [
        { id: uniqueId(), name: 'Salary', amount: 25000, type: 'income' },
        { id: uniqueId(), name: 'Pay Morgage', amount: 3500, type: 'expence'},
        { id: uniqueId(), name: 'Buy Fishing Gear', amount: 2000, type: 'expence'},
    ]
}

var balanceEl = document.querySelector('#balance');
var incomeEl = document.querySelector('#income');
var expenceEl = document.querySelector('#expence');
var transactionEl = document.querySelector('#transaction');
var incomeBtnEl = document.querySelector('#incomeBtn');
var expenceBtnEl = document.querySelector('#expenceBtn');
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');

function init() {
    updateState();
    initListners();
}

function uniquId(){
    return Math.round(Math.random() * 1000000);
}

function initListners() {
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    expenceBtnEl.addEventListener('click', onAddExpenceClick);

}

function onAddIncomeClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, 'income');
}

function onAddExpenceClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, 'expence');
}

function addTransaction(name, amount, type){
    if(name !== '' && amount !== '') {
        var transaction = { 
            id: uniquId(),
            name: name, 
            amount: parseInt(amount), 
            type: type 
        };

        state.transactions.push(transaction);

        updateState();
    }else {
        alert('Please enter calid data');
    }

    nameInputEl.value = '';
    amountInputEl.value = '';

}

function onDeleteClick(event) {
    var id = parseInt (event.target.getAttribute('data-id'));
    var deleteIntex;
    for (var i = 0; i < state.transactions.length; i++) {
        if (state.transactions[i].id === id){
            deleteIntex = i;
            break;
        }
    }

    state.transactions.splice(deleteIntex, 1);

    updateState();
}

function updateState() {
    var balance = 0,
        income = 0,
        expence = 0,
        item;

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];

        if(item.type === 'income') {
            income += item.amount;
        }else if (item.type === 'expence') {
            expence += item.amount;
        }
    }

    balance = income - expence;

    console.log(balance, income, expence);
    state.balance = balance;
    state.income = income;
    state.expence = expence;
    render();
}

    function render() {
        balanceEl.innerHTML = '$${state.balance}';
        incomeEl.innerHTML = '$${state.income}';
        expenceEl.innerHTML = '$${state.expence}';

        var transactionEl, containerEl, amountEl, item, btnEl;

        transactionsEl.innerHTML = '';

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(state.transactions[i].name);

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');
        if (item.type === 'income') {
            amountEl.classList.add('income-amt')
        } else if (item.type === 'expence') {
            amountEl.classList.add('expence-amt')
        }
        amountEl.innerHTML = '$${item.amount}';

        containerEl.appendChild(amountEl);

        btnEl = document.appendChild('button');
        btnEL.setAttribute('data-id', item.id)
        btnEl.innerHTML = 'X';

        btnEl.addEventListener('click', onDeleteClick);

        containerEl.appendChild(btnEl);

        transactionEl.appendChild(containerEl);
    }
}

init()
