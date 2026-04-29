import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categories = ['Investments', 'Savings', 'Mortgage', 'Family', 'Entertainment', 'Social Commitment', 'Health/Fitness', 'Miscellaneous']
// const categories = ['Akiba', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

<<<<<<< HEAD
const formatNumber = (num) => {
  return Number(num || 0).toLocaleString();
};

const App = () => {

const [data, setData] = useState([
  { year: 1, salary: 0, petty: 0, expenses: Array(12).fill(0), accIncome: 0, accPetty: 0},
  { year: 2, salary: 0, petty: 0, expenses: Array(12).fill(0), accIncome: 0, accPetty: 0},
  { year: 3, salary: 0, petty: 0, expenses: Array(12).fill(0), accIncome: 0, accPetty: 0}
]);

const [currentMonth, setCurrentMonth] = useState(-1); // -1 = no month yet. 0 = Jan
const [currentYearIndex, setCurrentYearIndex] = useState(0); // Year 1, 2, 3

const nextMonth = () => {
  if (currentMonth < 11) {
    setCurrentMonth(currentMonth + 1);
  } else {
    // move to next year
    if (currentYearIndex < data.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
      setCurrentMonth(0);
    } else {
      alert("Game finished!");
    }
  }
};

const updateSalary = (yearIndex, value) => {
  const updated = [...data];
  updated[yearIndex].salary = value;
  setData(updated);
};

const updatePetty = (yearIndex, value) => {
  const updated = [...data];
  updated[yearIndex].petty = value;
  setData(updated);
};

const updateExpense = (yearIndex, monthIndex, value) => {
  const updated = [...data];
  updated[yearIndex].expenses[monthIndex] = value;
  setData(updated);
};

const receiveSalary = (yearIndex) => {
  const updated = [...data];
  updated[yearIndex].accIncome += updated[yearIndex].salary;
  setData(updated);

  if (currentMonth < 11) {
    setCurrentMonth(currentMonth + 1);
  } else {
    // Move to next year
    if (currentYearIndex < data.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
      setCurrentMonth(0);
    } else {
      alert("Game finished!");
    }
  }

};

const payPetty = (yearIndex) => {
  const updated = [...data];
  updated[yearIndex].accPetty += updated[yearIndex].petty;
  setData(updated);
};

const getYearSummary = (yearData) => {
  const income = yearData.accIncome;
  const pettyTotal = yearData.accPetty;
  const monthlyExpenses = yearData.expenses.reduce((s, v) => s + v, 0);


  const monthlyDisposable = yearData.salary - yearData.petty;
  const totalExpenses = pettyTotal + monthlyExpenses;
  const balance = income - totalExpenses;

  return {
    income,
    pettyTotal,
    monthlyExpenses,
    totalExpenses,
    balance,
    monthlyDisposable
  };
};

const labels = {
  income: "INCOME",
  pettyTotal: "PETTY",
  monthlyExpenses: "MONTHLY",
  totalExpenses: "TOTAL",
  balance: "BALANCE",
  monthlyDisposable: "DISPOSABLE INCOME"
};
=======
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
>>>>>>> 5503306391408546cf5b068d126ba0f535f12259

  return (
    <div className="App">
      <h1>ANNUAL BUDGET GAME</h1>
      <p>Welcome to play this game to learn how to budget annualy after deducting monthly repeating expenses (rent, utilities, groceries, transport, etc). <br />
        Feedback is highly appreciated. Contacts are at the bottom of the page.
      </p>

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
<<<<<<< HEAD
        In Swahili Language: <br></br>
        (A) Ingiza kiasi cha kipato kwa mwezi, itzidishwa mara 12 kupata kipato kwa mwaka. <br></br> 
        (B) Ingiza kiasi cha gharama ndogondogo kwa mwezi.
        <br />
        Kwa kila mwezi bonyeza (1) kupata mshahara, (2) kutoa matumizi madogo, (3) kujua aina ya gharma mwezi husika unatakiwa kugharimia,  halafu (4) ingiza kiasi. <br></br>
        Hakikisha jumla ya matumizi hayazidi salio la kipato / jumla kipato cha mwaka.
        {/* Maliza mwaka mmoja kablya ya kuhamia mwaka mwingine. Mwisho tengeneza bajeti yako ya mwaka. */}
      </p>

      <h2>
      Current: Year {data[currentYearIndex].year} - {months[currentMonth]}
      </h2>

      {/* <button onClick={nextMonth}>Next Month ▶</button> */}

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead><tr>
          <th>TOTAL SUMMARY</th>
            {data.map((y) => <th key={y.year}>Year {y.year}</th>)}
          </tr>
        </thead>

        <tbody>
           {['income','pettyTotal','monthlyExpenses','totalExpenses','balance'].map((key) => (
            <tr key={key}>
              <td>{labels[key]}</td>
              {data.map((y, i) => {
                const s = getYearSummary(y);
                return <td key={i} style={{ 
                  textAlign: "right", 
                  color: s.monthlyDisposable < 0 ? "red" : "black"
                  }}>{formatNumber(s[key])}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Expense Items</h3>
      {/* Passing expenses & others from App into MyTable as a prop */}
     
     <div style={{display: 'flex', gap: "20px", alignItems: "flex-start"}}>
      {data.map((year, yIndex) => (
        <div key={yIndex}>
          <h2>Year {year.year}</h2>

          <button onClick={() => receiveSalary(yIndex)}>
            1.Receive Salary
          </button>

          <input
            type="number"
            value={year.salary}
            placeholder="Monthly Salary"
            onChange={(e) => updateSalary(yIndex, parseInt(e.target.value) || 0)}
          />
          <br />
          <button onClick={() => payPetty(yIndex)}>
          2.Pay Petty
          </button>

          <input
            type="number"
            value={year.petty}
            placeholder="Monthly Petty"
            onChange={(e) => updatePetty(yIndex, parseInt(e.target.value) || 0)}
          />
          <br />

          <p
            style={{
              margin: "5px 0",
              fontWeight: "bold",
              color: (year.salary - year.petty) < 0 ? "red" : "black"
            }}
          >
            Monthly Disposable Income: {formatNumber(year.salary - year.petty)}
          </p>
          <br /> <br />


          <table border="1">
            <thead>
              <tr>
                <th>Month</th>
                <th>3.Expense</th>
                <th>4.Amount</th>
              </tr>
            </thead>

            <tbody>
              {months.map((month, mIndex) => (
                <tr key={mIndex}>
                  <td>{month}</td>
                  <td><ExpBtn /></td>
                  <td>
                    <input
                      type="number"
                      value={year.expenses[mIndex]}
                      disabled={ yIndex !== currentYearIndex || mIndex !== currentMonth}
                      onChange={(e) =>
                        updateExpense(
                          yIndex,
                          mIndex,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    {/* <div style={{ fontSize: "12px", color: "gray" }}>
                    {formatNumber(year.expenses[mIndex])}
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>
            Balance: {formatNumber(getYearSummary(year).balance)}
          </h4>

        </div >
      ))}
    </div>

          <p>
            <strong>CONTACTS:</strong> <br />
            <a href='https://www.linkedin.com/in/gonzaga-rugambwa/' target='_blank'>LinkedIn: Gonzaga</a><br />
            WhatsApp(Tz): +255788893444<br />
            Estonia: +37254660901
          </p>
=======
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

      <p>
        <strong>CONTACTS:</strong> <br />
        <a href='https://www.linkedin.com/in/gonzaga-rugambwa/' target='_blank'>LinkedIn - Gonzaga</a><br />
        +37254660901
      </p>
>>>>>>> 5503306391408546cf5b068d126ba0f535f12259

    </div >
  );
};

<<<<<<< HEAD

const ExpBtn = () => {
  const [label, setLabel] = useState('Set Expense');
  
  const handleClick = () => {
    const randomExpense = categories[Math.floor(Math.random() * categories.length)];
=======
const ExpBtn = () => {
  const [label, setLabel] = useState('Set Expense');
  const expenses = ['Investments', 'Savings', 'Mortgage', 'Family', 'Entertainment', 'Social Commitment', 'Health/Fitness', 'Miscellaneous'];
  // const expenses = ['Hisa', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

  const handleClick = () => {
    const randomExpense = expenses[Math.floor(Math.random() * expenses.length)];
>>>>>>> 5503306391408546cf5b068d126ba0f535f12259
    setLabel(randomExpense);
  };
  return <button onClick={handleClick}>{label}</button>;
}

<<<<<<< HEAD
=======
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



>>>>>>> 5503306391408546cf5b068d126ba0f535f12259
export default App;

