import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice"
import requestsReducer from "../features/requestsSlice"
import messagesReducer from "../features/messagesSlice"
import conversationsReducer from "../features/conversationsSlice"
import subscriptionsReducer from '../features/subscriptionsSlice'
import {reducer as toastrReducer} from 'react-redux-toastr'


const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
    messages: messagesReducer,
    conversations: conversationsReducer,
    toastr: toastrReducer,
    subscriptions: subscriptionsReducer
  },
});

export default store
