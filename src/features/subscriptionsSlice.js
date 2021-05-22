import { createSlice } from "@reduxjs/toolkit";

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    consumer: null,
    pendingReqSub: null,
    userReqSubs: {},
    userConvoSubs: {},
  },
  reducers: {
    setConsumer(state, action) {
      console.log(action.payload);

      state.consumer = null;
      // state.consumer = action.payload;
    },
    setPendingReqSub(state, action) {
      state.pendingReqSub = action.payload;
    },
    setUserReqSubs(state, action) {
      state.userReqSubs = action.payload;
    },
    setUserConvoSubs(state, action) {
      state.userConvoSubs = action.payload;
    },
  },
});

export const {
  setConsumer,
  setPendingReqSub,
  setUserReqSubs,
  setUserConvoSubs,
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
