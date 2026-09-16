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
    <div className="min-h-screen bg-slate-100 px-3 py-6 sm:px-5 sm:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Expense Tracker
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your income and expenses easily
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-green-600 p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm">Total Income</p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Rs. {totalIncome.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl bg-red-600 p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm">Total Expenses</p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Rs. {totalExpenses.toLocaleString()}
            </h2>
          </div>

          <div
            className={`rounded-2xl p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 lg:col-span-1 ${
              balance >= 0
                ? "bg-blue-600"
                : "bg-blue-600"
            }`}
          >
            <p className="text-sm">Net Balance</p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Rs. {balance.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <IncomeSection />
          <ExpenseSection />
        </div>

        <ExpenseChart />
      </div>
    </div>
  );
}

export default App;