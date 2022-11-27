import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import shoesReducer from "./slices/shoesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shoes: shoesReducer,
  },
});
