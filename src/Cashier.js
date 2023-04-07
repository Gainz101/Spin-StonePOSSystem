import { useState } from 'react';

import React from "react";
import './Cashier.css'; // Tell webpack that App.js uses these styles

// Sort of array with all the current listed Items
const baseItems = [{ item: 'Cheese Pizza', id: 1 }, { item: '1 Topping Pizza', id: 2 }, { item: '2-4 Topping Pizza', id: 3 }, { item: 'Drink', id: 4 }];




export default function CashierView() {
<<<<<<< HEAD
 
  // Arrange of items to 2x2 button format
=======
  // const [countNum, changeCount] = useState(0);

  // function whenClicked(){
  //   changeCount(countNum+1);
  // }
  /*
  const itemRow1 = baseItems.slice(0,2).map(baseItems => <button class = "cashButton"key={baseItems.id}> {baseItems.item}</button>);
  const itemRow2 = baseItems.slice(2).map(baseItems => <button class = "cashButton"key={baseItems.id}> {baseItems.item}</button>);*/

>>>>>>> d0ffa684ab309b94f8d4ba8bf21311cf50aa27ff
  const listItems = baseItems.map(baseItems => <div class="grid-item"><button class = "cashButton"key={baseItems.id}> {baseItems.item}</button></div>);

  return (
    //Parent Element
    <div>
      <div class="background">
        <h2>Cashier's Window</h2>
        <button onClick={() => props.onFormSwitch("consumer_view")} type="submit" class="signin">Exit</button>
          <div class="gridMover">
            <div class="grid-container">
              {listItems}
            </div>
          </div>
        </div>
    </div>
  );
}