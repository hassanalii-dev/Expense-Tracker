import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  income: [],
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expenseTracker",
  initialState,

  reducers: {
    addIncome: (state, action) => {
      const income = {
        id: nanoid(),
        title: action.payload.title,
        amount: Number(action.payload.amount),
      };

      state.income.push(income);
    },

    removeIncome: (state, action) => {
      state.income = state.income.filter(
        (item) => item.id !== action.payload
      );
    },

    addExpense: (state, action) => {
      const expense = {
        id: nanoid(),
        title: action.payload.title,
        amount: Number(action.payload.amount),
      };

      state.expenses.push(expense);
    },

    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addIncome,
  removeIncome,
  addExpense,
  removeExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;