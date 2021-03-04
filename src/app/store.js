import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice"
import requestsReducer from "../features/requestsSlice"


const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
  },
});

export default store
