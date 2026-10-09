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
    <div className="min-h-screen bg-slate-950 px-3 py-6 text-slate-100 sm:px-5 sm:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Expense Tracker
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Manage your income and expenses easily & efficiently
          </p>
        </header>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-5 shadow-lg shadow-emerald-950/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-sm font-medium text-emerald-400">Total Income</p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-30 sm:text-3xl">
              Rs. {totalIncome.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/40 p-5 shadow-lg shadow-rose-950/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
            <p className="text-sm font-medium text-rose-400">Total Expenses</p>
            <h2 className="mt-2 text-2xl font-bold text-rose-300 sm:text-3xl">
              Rs. {totalExpenses.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/40 p-5 shadow-lg shadow-indigo-950/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-indigo-400">Net Balance</p>
            <h2 className="mt-2 text-2xl font-bold text-indigo-300 sm:text-3xl">
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