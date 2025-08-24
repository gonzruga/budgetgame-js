import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categories = ['Akiba', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

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
      <h1>Personal Finance Game</h1>
      <p>Accumulated Income: ${accIncome}</p>
      <p>Total Petty Expenses: ${totalPettyExpenses}</p>
      <p>Total Monthly Expenses: ${totalMonthlyExpenses}</p>
      <p>Accumulated Expenses: ${accExpenses}</p>

      <p><strong>Current Balance: ${balance}</strong></p>

      <h5>Enter Salary</h5>
      <input
        type="number"
        value={salary}
        // onChange={(e) => setSalary(parseInt(e.target.value, 10) || 0)}
        onChange={(e) => setSalary(parseInt(e.target.value, 10))}
        placeholder="Enter Salary Amount"
      />

      <br /> <br />
      <button onClick={handleSalary}>1. Receive Salary</button>

      <h2>Petty Expenses</h2>
      <input
        type="number"
        value={pettyExpenses}
        onChange={(e) => setPettyExpenses(parseInt(e.target.value, 10))}
        placeholder="Allocate Petty Expenses"
      />
      <button onClick={handlePettyExpenses}>2. Allocate Petty Expenses</button>

      <h2>Expense Items</h2>
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
  const expenses = ['Hisa', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

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

