import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  
  const mapStyles = {        
    height: "50vh",
    width: "50%"
  };
  
  const defaultCenter = {
    lat: 30.611460, lng: -96.340530
  }

  const locations = [
    {
      name: "Spin N Stone",
      location: {
        lat: 30.611460, lng: -96.340530
      }
    }
  ];
  
  return (
    <LoadScript
      googleMapsApiKey='ENTER_API_KEY'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        {locations.map(item => {
          return (
            <Marker key={item.name} position={item.location} />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;




// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';


// const MapContainer = () => {
  
//   const mapStyles = {        
//     height: "100vh",
//     width: "50%"};
  
//   const defaultCenter = {
//     lat: 30.611460, lng: -96.340530
//   }
  
//   return (
//      <LoadScript
//        googleMapsApiKey='AIzaSyDmtsfBpW91ZPM3_GWhYjS0SNE7mcKOgvY'>
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={defaultCenter}
//         />
//      </LoadScript>
//   )
// }

// export default MapContainer;