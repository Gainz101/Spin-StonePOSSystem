import React from "react";
import MapContainer from './mapview';

export default function MapTab(){
    return(
        <div>
            <center>
            {MapContainer()}
            </center>
        </div>
    );
}