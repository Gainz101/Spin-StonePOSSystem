import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const MapContainer = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "50%"};
  
  const defaultCenter = {
    lat: 30.611460, lng: -96.340530
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyDmtsfBpW91ZPM3_GWhYjS0SNE7mcKOgvY'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;