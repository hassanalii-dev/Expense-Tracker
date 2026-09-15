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
    <section className="rounded-2xl border border-green-200 bg-white p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-green-600">
          Income
        </h2>

        <p className="text-sm text-gray-500">
          Add your income sources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Income title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Add Income
        </button>
      </form>

      <div className="mt-6 overflow-x-auto">
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
                  className="border-b"
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
                      className="rounded-md bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
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

      <div className="mt-5 rounded-lg bg-green-600 p-4 text-white">
        <p className="text-sm">Total Income</p>

        <h3 className="text-2xl font-bold">
          Rs. {totalIncome.toLocaleString()}
        </h3>
      </div>
    </section>
  );
}

export default IncomeSection;