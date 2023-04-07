import {useState} from 'react';
import React from "react";
import './App.css'; // Tell webpack that App.js uses these styles


const baseItems = [{item: 'Order History', id: 1}, {item:'Inventory', id: 2}];



  export default function ManagerView() {
    // const [countNum, changeCount] = useState(0);

    // function whenClicked(){
    //   changeCount(countNum+1);
    // }
    //Mapping of buttons
    const listItems = baseItems.map(baseItems => 
    <div class="card__container">
        <div class = "card">
            <button class="cardContent" key={baseItems.id}> 
                {baseItems.item}
            </button>
        </div>
    </div>);

    return (
      //Parent Element
      <div>
        <div class="background">
          <h2>Manager Select</h2>
          {listItems}
        </div>
      </div>
    );
  }