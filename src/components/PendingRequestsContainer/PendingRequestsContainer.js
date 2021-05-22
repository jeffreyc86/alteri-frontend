import React, { useState, useEffect } from "react";
import PendingRequestCard from "./PendingRequestCard";
import { getDistance, convertDistance } from "geolib";
import { useSelector } from "react-redux";
import useSubscription from "../../features/useSubscriptions";

function PendingRequestContainer() {
  const ws = useSubscription();

  const [distFilter, setDistFilter] = useState(100000000);

  const currentLocation = useSelector((state) => state.user.currentLocation);
  const currentUser = useSelector((state) => state.user.currentUser);
  const pendingRequests = useSelector(
    (state) => state.requests.allPendingRequests
  );

  const openRequests = pendingRequests.filter(
    (req) => req.recipient_id !== currentUser.id
  );

  // currentUser is authed, create pending request subscription
  useEffect(
    () => {
      if (currentUser) {
        ws.createPendingSub();
      }

      // Componet Unmounts
      return () => {
        ws.disconnectPendingSub();
      };
    },
    // eslint-disable-next-line
    [currentUser]
  );

  const checkIfWithinDistance = (request) => {
    let distance = "Unavailable";

    if (currentLocation && request.recipient_loc.lat) {
      distance = convertDistance(
        getDistance(
          { latitude: currentLocation.lat, longitude: currentLocation.lng },
          {
            latitude: request.recipient_loc.lat,
            longitude: request.recipient_loc.lng,
          }
        ),
        "mi"
      ).toFixed(1);
    }

    if (distance === "unavailable" || parseFloat(distance) <= distFilter) {
      return true;
    } else {
      return false;
    }
  };

  const openPendingRequests = openRequests.filter((request) =>
    checkIfWithinDistance(request)
  );

  const pendingReqCards = openPendingRequests.map((request) => {
    return <PendingRequestCard key={request.id} request={request} />;
  });

  // debugger
  return (
    <div className="pending-req-container">
      <img
        className="pending-req-banner"
        src={process.env.PUBLIC_URL + "/images/pendingreq-banner.jpg"}
        alt="pending req banner"
      />
      <div className="distance-filter">
        <label htmlFor="distance filter">Filter by Distance Within</label>
        <select
          value={distFilter}
          onChange={(e) => setDistFilter(parseInt(e.target.value))}
        >
          <option value="10000000000">Any</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
          <option value="30">30 miles</option>
        </select>
      </div>
      {pendingReqCards.length > 0 ? (
        <div className="pending-requests">
          <table className="request-info-table">
            <tbody>
              <tr>
                <th>Request Number</th>
                <th>Date Created</th>
                <th>Recipient</th>
                <th>Distance Away</th>
              </tr>
            </tbody>
          </table>
          {pendingReqCards}
        </div>
      ) : (
        <div className="no-reqs">
          <h1>
            There are currently no open requests.
            <br />
            Please check again later.
          </h1>
        </div>
      )}
    </div>
  );
}

export default PendingRequestContainer;
