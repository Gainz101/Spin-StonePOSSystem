import { useState } from 'react';

import React from "react";
import './Cashier.css'; // Tell webpack that App.js uses these styles


const baseItems = [{ item: 'Cheese Pizza', id: 1 }, { item: '1 Topping Pizza', id: 2 }, { item: '2-4 Topping Pizza', id: 3 }, { item: 'Drink', id: 4 }];




export default function CashierView() {
  // const [countNum, changeCount] = useState(0);

  // function whenClicked(){
  //   changeCount(countNum+1);
  // }
  /*
  const itemRow1 = baseItems.slice(0,2).map(baseItems => <button class = "cashButton"key={baseItems.id}> {baseItems.item}</button>);
  const itemRow2 = baseItems.slice(2).map(baseItems => <button class = "cashButton"key={baseItems.id}> {baseItems.item}</button>);*/

  const listItems = baseItems.map(baseItems => <div class="grid-item"><button class = "cashButton"key={baseItems.id}> {baseItems.item}</button></div>);




  return (
    //Parent Element
    <div>
      <div class="background">
        <h2>Cashier's Window</h2>
          <div class="gridMover">
            <div class="grid-container">
              {listItems}
            </div>
          </div>
        </div>
    </div>
  );
}