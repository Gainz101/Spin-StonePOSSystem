import React from "react";
import MapContainer from './mapview';

export default function MapTab(){
    //Fills page with map function that calls map
    return(
        <div>
            <center>

        
            {MapContainer()}
            </center>
        </div>
    );
}