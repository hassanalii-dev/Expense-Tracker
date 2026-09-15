import { useSelector } from "react-redux";
import IncomeSection from "./components/IncomeSection";
import ExpenseSection from "./components/ExpenseSection";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const income = useSelector(
    (state) => state.expenseTracker.income
  );

  const expenses = useSelector(
    (state) => state.expenseTracker.expenses
  );

  const totalIncome = income.reduce(
    (total, item) => total + item.amount,
    0
  );

  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Expense Tracker
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your income and expenses easily
          </p>
        </header>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-green-600 p-5 text-white shadow-lg">
            <p className="text-sm">Total Income</p>

            <h2 className="mt-2 text-3xl font-bold">
              Rs. {totalIncome.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl bg-red-600 p-5 text-white shadow-lg">
            <p className="text-sm">Total Expenses</p>

            <h2 className="mt-2 text-3xl font-bold">
              Rs. {totalExpenses.toLocaleString()}
            </h2>
          </div>

          <div
            className={`rounded-2xl p-5 text-white shadow-lg ${
              balance >= 0 ? "bg-blue-600" : "bg-orange-600"
            }`}
          >
            <p className="text-sm">Net Balance</p>

            <h2 className="mt-2 text-3xl font-bold">
              Rs. {balance.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <IncomeSection />
          <ExpenseSection />
        </div>

        <ExpenseChart />
      </div>
    </div>
  );
}

export default App;