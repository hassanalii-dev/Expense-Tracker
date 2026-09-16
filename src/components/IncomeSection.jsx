import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, removeIncome } from "../reducers/expenseSlice";

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
        title: title.trim(),
        amount: amount,
      })
    );

    setTitle("");
    setAmount("");
  };

  const totalIncome = income.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <section className="rounded-2xl border border-green-200 bg-white p-5 shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-5 animate-[fadeIn_0.5s_ease-out]">
        <h2 className="text-2xl font-bold text-green-600">
          Income
        </h2>

        <p className="text-sm text-gray-500">
          Add your income sources
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 animate-[slideUp_0.6s_ease-out]"
      >
        <input
          type="text"
          placeholder="Income title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-md active:translate-y-0"
        >
          Add Income
        </button>
      </form>

      <div className="mt-6 overflow-x-auto animate-[fadeIn_0.8s_ease-out]">
        <table className="w-full min-w-[400px] text-left">
          <thead>
            <tr className="border-b bg-green-50">
              <th className="px-3 py-3">Title</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {income.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="py-6 text-center text-gray-500"
                >
                </td>
              </tr>
            ) : (
              income.map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition-all duration-200 hover"
                >
                  <td className="px-3 py-3">
                    {item.title}
                  </td>

                  <td className="px-3 py-3 font-semibold text-green-600">
                    Rs. {item.amount.toLocaleString()}
                  </td>

                  <td className="px-3 py-3">
                    <button
                      onClick={() =>
                        dispatch(removeIncome(item.id))
                      }
                      className="rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md active:scale-95"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-lg bg-green-600 p-4 text-white transition-all duration-300 hover:shadow-lg animate-[slideUp_0.8s_ease-out]">
        <p className="text-sm">Total Income</p>

        <h3 className="text-2xl font-bold">
          Rs. {totalIncome.toLocaleString()}
        </h3>
      </div>

    </section>
  );
}

export default IncomeSection;