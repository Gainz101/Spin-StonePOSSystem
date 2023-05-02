import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  
  const mapStyles = {  //Adds CSS to map      
    height: "50vh",
    width: "50%"
  };
  
  const defaultCenter = {
    lat: 30.611460, lng: -96.340530
  }

  const locations = [
    //Adds pin on Spin n Stone location
    {
      name: "Spin N Stone",
      location: {
        lat: 30.611460, lng: -96.340530
      }
    }
  ];
  
  return (
    //Loads map and plugs in API key to load map with marker
    <LoadScript
      googleMapsApiKey='AIzaSyCqQra3-WE5R3GSzUs4gll1SgbmZKu3q2w'>
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