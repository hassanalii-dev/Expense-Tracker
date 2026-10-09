import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncome,
  removeIncome,
} from "../reducers/expenseSlice";

function IncomeSection() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  const income = useSelector(
    (state) => state.expenseTracker.income
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      return;
    }

    dispatch(
      addIncome({
        title,
        amount: Number(amount),
      })
    );

    setTitle("");
    setAmount("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 ease-out hover:-translate-y-0.5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-emerald-400">
          Income
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Add your income sources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Income title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />

        <input
          type="number"
          placeholder="Income amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.99]"
        >
          Add Income
        </button>
      </form>

      <div className="mt-7">
        <h3 className="mb-3 text-lg font-semibold text-slate-200">
          Income List
        </h3>

        <div className="space-y-3">
          {income.length === 0 ? (
            <p className="rounded-xl border border-slate-800 bg-slate-800/50 p-4 text-center text-sm text-slate-500">
              No income added yet.
            </p>
          ) : (
            income.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4 transition-all duration-200 hover:border-emerald-500/30"
              >
                <div>
                  <p className="font-semibold text-slate-200">
                    {item.title}
                  </p>
                  <p className="text-sm font-medium text-emerald-400">
                    Rs. {item.amount.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    dispatch(removeIncome(item.id))
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

export default IncomeSection;