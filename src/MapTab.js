import React from "react";
import MapContainer from './mapview';

/**
 * 
 * @returns returns a page that has the entire map container for the tabs on customer view
 */
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