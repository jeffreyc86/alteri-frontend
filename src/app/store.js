import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice"
import requestsReducer from "../features/requestsSlice"
import messagesReducer from "../features/messagesSlice"
import conversationsReducer from "../features/conversationsSlice"


const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
    messages: messagesReducer,
    conversations: conversationsReducer
  },
});

export default store
