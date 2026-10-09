import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  removeExpense,
} from "../reducers/expenseSlice";

function ExpenseSection() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();

  const expenses = useSelector(
    (state) => state.expenseTracker.expenses
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      return;
    }

    dispatch(
      addExpense({
        title,
        amount: Number(amount),
        category,
      })
    );

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-rose-400">
          Expenses
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Add your expenses
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        />

        <input
          type="number"
          placeholder="Expense amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 outline-none transition-all duration-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
        >
          <option value="Food" className="bg-slate-900">Food</option>
          <option value="Rent" className="bg-slate-900">Rent</option>
          <option value="Clothes" className="bg-slate-900">Clothes</option>
          <option value="Transport" className="bg-slate-900">Transport</option>
          <option value="Bills" className="bg-slate-900">Bills</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-xl bg-rose-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-600/20 active:scale-[0.99]"
        >
          Add Expense
        </button>
      </form>

      <div className="mt-7">
        <h3 className="mb-3 text-lg font-semibold text-slate-200">
          Expense List
        </h3>

        <div className="space-y-3">
          {expenses.length === 0 ? (
            <p className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-center text-sm text-slate-500">
              No expenses added yet.
            </p>
          ) : (
            expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-rose-500/10 bg-rose-950/20 p-4 transition-all duration-200 hover:border-rose-500/30"
              >
                <div>
                  <p className="font-semibold text-slate-200">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {item.category}
                  </p>
                  <p className="text-sm font-medium text-rose-400">
                    Rs. {item.amount.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    dispatch(removeExpense(item.id))
                  }
                  className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-400 transition-all duration-200 hover:bg-rose-600 hover:text-white active:scale-[0.98]"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseSection;