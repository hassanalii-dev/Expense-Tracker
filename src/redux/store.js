import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "../reducers/expenseSlice";

export const store = configureStore({
  reducer: {
    expenseTracker: expenseReducer,
  },
});