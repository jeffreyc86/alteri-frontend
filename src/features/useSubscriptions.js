import React, { useDebugValue } from "react";
import { createConsumer } from "@rails/actioncable";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePendingRequests,
  updateUserRequests,
  addPendingRequest,
} from "../features/requestsSlice";
import { addMembership } from "../features/userSlice";
import { addConvo } from "../features/conversationsSlice";

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
          connected: () => {console.log("pr connected")},
          received: (request) => {
            dispatch(addPendingRequest(request));
          },
          disconnected: () => {
            console.log("pr disconnected");
          },
        }
      );
    }
  };

  const disconnectPendingSub = () => {
    if (WS_CONNECTION.pendingReqSub) {
      WS_CONNECTION.pendingReqSub.disconnected();
      WS_CONNECTION.pendingReqSub = null;
    }
  };

  // create new user sub
  const createUserReqSubs = (usersPendingRequests = []) => {
    if (usersPendingRequests.length > 0) {
      usersPendingRequests.forEach((request) => {
        // debugger
        if (!WS_CONNECTION.userReqSubs[request.id]) {
          WS_CONNECTION.userReqSubs[request.id] =
            WS_CONNECTION.consumer.subscriptions.create(
              {
                channel: "RequestChannel",
                id: request.id,
              },
              {
                connected: () => {
                  console.log(`request ${request.id} connected`);
                },
                received: (data) => {
                  if (data.request) {
                    dispatch(updateUserRequests(data.request));
                  } else {
                    const request = data[0];
                    const membership = data[1];
                    const conversation = data[2];
                    dispatch(updatePendingRequests(request));
                    dispatch(updateUserRequests(request));
                    dispatch(addMembership(membership));
                    dispatch(addConvo(conversation));
                  }
                },
                disconnected: () => {
                  debugger;
                  console.log(`request ${request.id} DISconnected`);
                },
              }
            );
        }
      });
    }
  };

  const disconnectUserReqSubs = (id = "") => {
    const discUserReqSub = (reqId) => {
      if (WS_CONNECTION.userReqSubs[reqId]) {
        WS_CONNECTION.userReqSubs[reqId].disconnected();
        delete WS_CONNECTION.userReqSubs[reqId];
      }
    };

    // Single Case
    if (id) {
      discUserReqSub(id);
    } else {
      // Multi Case
      Object.keys(WS_CONNECTION.userReqSubs).forEach((reqId) =>
        discUserReqSub(reqId)
      );
    }
  };

  useDebugValue(WS_CONNECTION);

  return {
    subscriptions: WS_CONNECTION,
    createWebSocket,
    // PendingSub
    createPendingSub,
    disconnectPendingSub,
    // UserReqSubs
    createUserReqSubs,
    disconnectUserReqSubs,
  };
};

export default useSubscription;
