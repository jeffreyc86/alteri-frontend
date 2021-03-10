import React from 'react'
import {useSelector} from 'react-redux'
import GoogleMapReact from 'google-map-react';
 
const Marker = () => {
  return (
    <div className="marker">
      <img width="20vw" src={process.env.PUBLIC_URL + '/images/marker.png'}/>;
      <div className="centered">Your Location</div>
    </div>
  )
}

const OtherMarker = ({name}) => {
  return (
    <div className="marker">
      <img width="20vw" src={process.env.PUBLIC_URL + '/images/marker2.png'}/>;
      <div className="centered">{name}'s Location</div>
    </div>
  )
}

function MapContainer ({request}) {
  const defaultProps = {
    center: {
      lat: 40.7128,
      lng: -74.0060
    },
    zoom: 11
  };
  
  const currentLocation = useSelector(state=>state.user.currentLocation)
  const currentUser = useSelector(state=>state.user.currentUser)

  let userPin = null
    if (currentLocation) {
      userPin = <Marker lat={currentLocation.lat} lng={currentLocation.lng} /> 
    }

  let otherPin = null 
    if (request && request.recipient_id === currentUser.id) {
      if (request.donor_loc.lat){
        otherPin = <OtherMarker lat={request.donor_loc.lat} lng={request.donor_loc.lng} name={request.donor_name} />
      }
    } else if (request && request.donor_id === currentUser.id){
      if (request.recipient_loc.lat){
        otherPin = <OtherMarker lat={request.recipient_loc.lat} lng={request.recipient_loc.lng} name={request.recipient_name} />
      }
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '35vh'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API}}
          defaultCenter={currentLocation ? currentLocation : defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
        {otherPin}
        {userPin}
        </GoogleMapReact>
      </div>
    );

}

export default MapContainer


