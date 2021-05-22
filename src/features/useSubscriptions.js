import React, {useDebugValue} from "react";
import { createConsumer } from "@rails/actioncable";
import { useDispatch, useSelector } from "react-redux";
import {
  setConsumer,
  setPendingReqSub,
  setUserReqSubs,
  setUserConvoSubs,
} from "./subscriptionsSlice";
import { addPendingRequest } from "../features/requestsSlice";

var WS_CONNECTION = {
  consumer: null,
  pendingReqSub: null,
  userReqSubs: {},
  userConvoSubs: {},
};

const useSubscription = () => {
  // REDUX
  const dispatch = useDispatch();

  // WEBSOCKET
  const createWebSocket = () => {
    const token = localStorage.getItem("token");

    WS_CONNECTION.consumer = createConsumer(
      `${process.env.REACT_APP_WS_URL}?token=${token}`
    );
  };

  // SUBSCRIPTIONS
  const createPendingSub = () => {
    if (!WS_CONNECTION.pendingReqSub && WS_CONNECTION.consumer) {
      WS_CONNECTION.pendingReqSub = WS_CONNECTION.consumer.subscriptions.create(
        {
          channel: "PendingRequestsChannel",
        },
        {
          connected: () => {
          },
          received: (request) => {
            dispatch(addPendingRequest(request));
          },
          disconnected: () => {
          },
        }
      );
    }
  };

  const disconnectPendingSub = () => {
    if (WS_CONNECTION.pendingReqSub) {
      WS_CONNECTION.pendingReqSub.unsubscribe();
      WS_CONNECTION.pendingReqSub = null;
    }
  };

  const createUserReqSub = () => {};
  const createUserConvoSub = () => {};

  useDebugValue(WS_CONNECTION)

  return {
    subscriptions: WS_CONNECTION,
    createWebSocket,
    createPendingSub,
    disconnectPendingSub,
    createUserReqSub,
  };
};

export default useSubscription;
