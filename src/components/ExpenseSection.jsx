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
        amount,
        category,
      })
    );

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          Expenses
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your expenses
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        <input
          type="number"
          placeholder="Expense amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        >
          <option value="Food"> Food</option>
          <option value="Rent">Rent</option>
          <option value="Clothes">Clothes</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.99]"
        >
          Add Expense
        </button>
      </form>

      <div className="mt-7">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">
          Expense List
        </h3>

        <div className="space-y-3">
          {expenses.length === 0 ? (
            <p className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
              No expenses added yet.
            </p>
          ) : (
            expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-red-50 p-4 transition-shadow duration-200 hover:shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.category}
                  </p>

                  <p className="text-sm text-red-600">
                    Rs. {item.amount.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    dispatch(removeExpense(item.id))
                  }
                  className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white active:scale-[0.98]"
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