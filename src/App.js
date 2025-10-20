import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categories = ['Investments', 'Savings', 'Mortgage', 'Family', 'Entertainment', 'Social Commitment', 'Health/Fitness', 'Miscellaneous']
// const categories = ['Akiba', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

const App = () => {
  const [pettyExpenses, setPettyExpenses] = useState(0);
  const [salary, setSalary] = useState(0);
  const [accIncome, setAccIncome] = useState(0);

  const [totalPettyExpenses, setTotalPettyExpenses] = useState(0);
  const [expensesInput, setExpensesInput] = useState([]);

  const handleSalary = () => {
    setAccIncome(accIncome + salary);
  };

  const handlePettyExpenses = () => {
    setTotalPettyExpenses(prev => prev + pettyExpenses);
  };

  const totalMonthlyExpenses = expensesInput.reduce((sum, val) => sum + (val || 0), 0);
  const accExpenses = totalPettyExpenses + totalMonthlyExpenses;

  const balance = accIncome - accExpenses;

  return (
    <div className="App">
      <h1>ANNUAL BUDGET GAME</h1>
      <p>Welcome to play this game to learn how to budget annualy after deducting monthly repeating expenses (rent, utilities, groceries, transport, etc).</p>

      <p>
        A. Insert a monthly salary amount. It will be multiplied by 12 to get the total annual income. <br />
        B. Insert monthly petty expenses amount. <br /><br />

        To practice annual budgeting, simulate each month by repeating the following steps: <br />
        1. Press 'Receive Salary' to salary of that month. <br />
        2. Press 'Allocate Petty Expenses' to deduct it from balance. <br />
        3. Press 'Set Expense' button to reveal what you are supposed to assign an amount to for that month.  <br />
        4. Then assign an amount. Make sure the total amount do not exceed the current balance / annual income. <br />
        Repeat until you can easily budget in a way close to your reality.
        {/* Finnish one year before going to another year. At the end create an annual budget in the provided template */}
        <br /><br />
        [In Swahili language] <br></br>
        Ingiza kiasi cha kipato kwa mwezi (A), itzidishwa mara 12 kupata kipato kwa mwaka. Ingiza kiasi cha gharama ndogondogo kwa mwezi (B).
        <br />
        Kwa kila mwezi bonyeza (1) kupata mshahara, (2) kutoa matumizi madogo, (3) kujua aina ya gharma mwezi husika unatakiwa kugharimia,  halafu (4) ingiza kiasi. Hakikisha jumla ya matumizi hayazidi salio la kipato / jumla kipato cha mwaka.
        {/* Maliza mwaka mmoja kablya ya kuhamia mwaka mwingine. Mwisho tengeneza bajeti yako ya mwaka. */}
      </p>
      <br /><br />

      <p>Accumulated Income: ${accIncome}</p>
      <p>Total Petty Expenses: ${totalPettyExpenses}</p>
      <p>Total Monthly Expenses: ${totalMonthlyExpenses}</p>
      <p>Accumulated Expenses: ${accExpenses}</p>

      <p><strong>Current Balance: ${balance}</strong></p>

      <h3>A. Salary</h3>
      <input
        type="number"
        value={salary}
        // onChange={(e) => setSalary(parseInt(e.target.value, 10) || 0)}
        onChange={(e) => setSalary(parseInt(e.target.value, 10))}
        placeholder="Enter Salary Amount"
      />

      <button onClick={handleSalary}>1. Receive Salary</button>

      <h3>B. Petty Expenses</h3>
      <input
        type="number"
        value={pettyExpenses}
        onChange={(e) => setPettyExpenses(parseInt(e.target.value, 10))}
        placeholder="Allocate Petty Expenses"
      />
      <button onClick={handlePettyExpenses}>2. Allocate Petty Expenses</button>

      <h3>Expense Items</h3>
      {/* Passing expenses & others from App into MyTable as a prop */}
      <MyTable
        expensesInput={expensesInput}
        setExpensesInput={setExpensesInput}
      // updateAccExpenses={updateAccExpenses}
      // accExpenses={accExpenses}
      />

    </div>
  );
};

const ExpBtn = () => {
  const [label, setLabel] = useState('Set Expense');
  const expenses = ['Investments', 'Savings', 'Mortgage', 'Family', 'Entertainment', 'Social Commitment', 'Health/Fitness', 'Miscellaneous'];
  // const expenses = ['Hisa', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

  const handleClick = () => {
    const randomExpense = expenses[Math.floor(Math.random() * expenses.length)];
    setLabel(randomExpense);
  };
  return <button onClick={handleClick}>{label}</button>;
}

const MyTable = ({ expensesInput, setExpensesInput }) => {

  const handleChange = (index, value) => {
    const updated = [...expensesInput];
    // const previous = updated[index] || 0;
    updated[index] = value;

    // const diff = value - previous;
    setExpensesInput(updated);
    // updateAccExpenses(diff);
  };

  // Total sum from inputs computed locally
  const total = expensesInput.reduce((sum, val) => sum + (val || 0), 0);

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Month</th>
          <th>3. Expense</th>
          <th>4. Amount</th>
        </tr>
      </thead>
      <tbody>
        {months.map((month, index) => (
          <tr key={index}>
            <td><p>{month}</p></td>
            <td><ExpBtn /></td>
            <td>
              <input
                type='number'
                defaultValue={0}
                onBlur={(e) => handleChange(index, parseInt(e.target.value) || 0)}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td><strong>Total</strong></td>
          <td><strong>${total}</strong></td>
        </tr>
      </tbody>
    </table>
  );
};

export default App;

