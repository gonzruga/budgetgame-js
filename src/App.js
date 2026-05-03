import './App.css';
import React, { useState } from 'react';
// import axios from 'axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const categories = ['Investments', 'Savings', 'Mortgage', 'Family', 'Entertainment', 'Social Commitment', 'Health/Fitness', 'Miscellaneous']
// const categories = ['Akiba', 'Ujenzi', 'Watoto', 'Burudani', 'Misiba', 'Harusi', 'Matibabu', 'Mengineyo'];

const formatNumber = (num) => {
  return Number(num || 0).toLocaleString();
};

const App = () => {

  const [data, setData] = useState([
    { year: 1, salary: 0, petty: 0, expenses: Array(12).fill(0), accIncome: 0, accPetty: 0 },
    { year: 2, salary: 0, petty: 0, expenses: Array(12).fill(0), accIncome: 0, accPetty: 0 },
    { year: 3, salary: 0, petty: 0, expenses: Array(12).fill(0), accIncome: 0, accPetty: 0 }
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
  // -------- BUDGET PART -----------------------

  const [budgetSalary, setBudgetSalary] = useState(0);
  const [budgetPetty, setBudgetPetty] = useState(0);

  const [budgetExpenses, setBudgetExpenses] = useState(
    categories.map(() => 0)
  );

  const updateBudgetExpenses = (index, value) => {
    const updated = [...budgetExpenses];
    updated[index] = value;
    setBudgetExpenses(updated);
  };

  const monthlyDisposableIncome = budgetSalary - budgetPetty;
  const annualDisposableIncome = monthlyDisposableIncome * 12;
  const annualPettyExpenses = budgetPetty * 12;
  const annualExpenses = budgetExpenses.reduce((sum, value) => sum + value, 0);
  const annualIncome = budgetSalary * 12;
  const balanceDisposable = annualDisposableIncome - annualExpenses;

  React.useEffect(() => {
  if (balanceDisposable < 0) {
    alert(
      "You have allocated more money than your annual disposable income budget. Please adjust your expenses to fit within your budget."
    );
  }
}, [balanceDisposable]);


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

      <button onClick={nextMonth}>Next Month ▶</button>

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead><tr>
          <th>TOTAL SUMMARY</th>
          {data.map((y) => <th key={y.year}>Year {y.year}</th>)}
        </tr>
        </thead>

        <tbody>
          {['income', 'pettyTotal', 'monthlyExpenses', 'totalExpenses', 'balance'].map((key) => (
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

      {/* Passing expenses & others from App into MyTable as a prop */}

      <div style={{ display: 'flex', gap: "20px", alignItems: "flex-start" }}>
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
                        disabled={yIndex !== currentYearIndex || mIndex !== currentMonth}
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

      <hr />

      <h2>ANNUAL BUDGET PLANNER</h2>

      <p>Now your main task is to create an annual budget by allocating amounts on expenses of disposable income making sure they don't exceed the budget.</p>

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>A. Monthly Salary</th>
            <th>B. Monthly Petty Expenses</th>
            <th>C. Monthly Disposable Income (A-B)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input
                type="number"
                value={budgetSalary}
                onChange={(e) =>
                  setBudgetSalary(parseInt(e.target.value) || 0)
                }
              />
            </td>

            <td>
              <input
                type="number"
                value={budgetPetty}
                onChange={(e) =>
                  setBudgetPetty(parseInt(e.target.value) || 0)
                }
              />
            </td>

            <td
              style={{
                color: monthlyDisposableIncome < 0 ? 'red' : 'black',
                fontWeight: 'bold'
              }}
            >
              {formatNumber(monthlyDisposableIncome)}
            </td>
          </tr>              
        </tbody>
      </table>

      <br />

      {/* <h3>Budget Summary</h3> */}

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>D. Annual Income (A x 12)</th>
            <th>Annual Petty Expenses</th>
            <th>E.Annual Disposable Income</th>
            <th>F. Allocated Disposable Expenses</th> 
            {/* <th>Accumulated Annual Expenses</th> */}
            <th>Unallocated Disposable Budget (E-F)</th>
            {/* Annual Expenses */}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{formatNumber(annualIncome)}</td>
            <td>{formatNumber(annualPettyExpenses)}</td>
            <td>{formatNumber(annualDisposableIncome)}</td>
            <td>{formatNumber(annualExpenses)}</td>
            {/* <td>{formatNumber(accumulatedExpenses)}</td> */}
            <td style={{
                color: balanceDisposable < 0 ? "red" : "black"}}>{formatNumber(balanceDisposable)}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <h3>Annual Disposable Income Budget</h3>

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category}</td>

              <td>
                <input
                  type="number"
                  value={budgetExpenses[index]}
                  onChange={(e) =>
                    updateBudgetExpenses(
                      index,
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </td>
            </tr>
          ))}

          <tr>
            <td>
              <strong>F. Total</strong>
            </td>

            <td>
              <strong>{formatNumber(annualExpenses)}</strong>
            </td>
          </tr>

          <tr>
            <td>
              <strong>E. Annual Budget</strong>
            </td>

            <td>
              <strong>{formatNumber(annualDisposableIncome)}</strong>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Balance Unallocated</strong>
            </td>

            <td>
              <strong style={{
                color: balanceDisposable < 0 ? "red" : "black",}}>
                {formatNumber(balanceDisposable)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>CONTACTS:</strong> <br />
        <a href="https://www.linkedin.com/in/gonzaga-rugambwa/" target="_blank" rel="noopener noreferrer">
          LinkedIn: Gonzaga
        </a><br />
        Estonia: +37254660901<br />
        WhatsApp(Tz): +255788893444

      </p>

    </div >
  );
};


const ExpBtn = () => {
  const [label, setLabel] = useState('Set Expense');

  const handleClick = () => {
    const randomExpense = categories[Math.floor(Math.random() * categories.length)];
    setLabel(randomExpense);
  };
  return <button onClick={handleClick}>{label}</button>;
}

export default App;

