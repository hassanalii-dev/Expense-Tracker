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
      state.income.push({
        id: nanoid(),
        title: action.payload.title,
        amount: Number(action.payload.amount),
      });
    },

    removeIncome: (state, action) => {
      state.income = state.income.filter(
        (item) => item.id !== action.payload
      );
    },

    addExpense: (state, action) => {
      state.expenses.push({
        id: nanoid(),
        title: action.payload.title,
        amount: Number(action.payload.amount),
      });
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