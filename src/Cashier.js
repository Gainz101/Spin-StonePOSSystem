import { useState, useEffect } from 'react';
import React from "react";
import './Cashier.css'; // Tell webpack that App.js uses these styles


// Sort of array with all the current listed Items
const baseItems = [{ item: 'Cheese Pizza', id: 1 }, { item: '1 Topping Pizza', id: 2 }, { item: '2-4 Topping Pizza', id: 3 }, { item: 'Drink', id: 4 }];




export default function CashierView(props) {
  const [toppingCount, changeCountTop] = useState(0);
  const [crustCount, changeCountCrust] = useState(0);
  const [drizzleCount, changeCountDrizz] = useState(0);
  const [sauceCount, changeCountSauce] = useState(0);
  // const [pizzaState, setState] = useState(true);



  function whenClickedTop(){
    if (toppingCount < 4) {
      changeCountTop((prevCount) => prevCount + 1);
    }  
  }

  function whenClickedCrust(){
    if (crustCount < 1) {
      changeCountCrust(crustCount + 1);
    } 
  }
  function whenClickedDrizz(){
    if (drizzleCount < 1) {
      changeCountDrizz(drizzleCount + 1);
    } 
  }
  function whenClickedSauce(){
    if (sauceCount < 1) {
      changeCountSauce((prevCount) => prevCount + 1);
    } 
  }
  
  const listItems = baseItems.map(baseItems => <button role="button" class="button-nameBase" key={baseItems.id}> {baseItems.item}</button>);
  

  const crustItems = [{item: 'Normal Crust', id: 1}, {item:'Cauliflower Crust', id: 2}];
    const listItemsCrust = crustItems.map(baseItems => <button onClick={whenClickedCrust} role="button" class="button-name" key={baseItems.id}> {baseItems.item}</button>);

    const sauceItems = [{item: 'Alfredo', id: 1}, {item:'Traditional Red', id: 2}, {item:'Zesty Red', id: 3}];
    const listItemsSauce = sauceItems.map(baseItems => <button onClick={whenClickedSauce} role="button" class="button-name2" key={baseItems.id}> {baseItems.item}</button>);

    const meatsItems = [{item: 'Italian Sausage', id: 1}, {item:'Meatball', id: 2}, {item:'Pepperoni', id: 3}, {item:'Salami', id: 4}, {item:'Smoked Chicken', id: 5}];
    const listItemsMeats = meatsItems.map(baseItems => <button onClick={whenClickedTop} role="button" class="button-name3" key={baseItems.id}> {baseItems.item}</button>);

    const veggiesItems = [{item: 'Green Peppers', id: 1}, {item:'Black Olives', id: 2}, {item:'Banana Peppers', id: 3}, {item:'Jalapenos', id: 4}, {item:'Mushrooms', id: 5}, {item:'Onions', id: 6}];
    const listItemsVeggies = veggiesItems.map(baseItems => <button onClick={whenClickedTop} role="button" class="button-name4" key={baseItems.id}> {baseItems.item}</button>);

    const drizzleItems = [{item: 'BBQ Sauce', id: 1}, {item:'Olive Oil', id: 2}, {item:'Siracha', id: 3}, {item:'Ranch', id: 4}, {item:'Oregano', id: 5}];
    const listItemsDrizzle = drizzleItems.map(baseItems => <button onClick={whenClickedDrizz} role="button" class="button-name5" key={baseItems.id}> {baseItems.item}</button>);
  
    const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_text">Exit</button></div>
  return (
    //Parent Element
    <div>
      <div class="backgroundBland">
        {exit}
        <h3>Cashier's Window</h3>
        <div class="counter"> Crust({crustCount}/1) Sauce ({sauceCount}/1) Toppings({toppingCount}/4) Drizzle({drizzleCount}/1)</div>
          <div class="baseSection">
            <div class="gridMover">
              <div class="grid-container">
                {listItems}
              </div>
            </div>
            <div class="toppingsSection">
              <div class="gridMoverToppings">
                <div class="grid-containerToppings">
                  {listItemsCrust}{listItemsSauce}{listItemsMeats}{listItemsVeggies}{listItemsDrizzle}
                </div>
              </div>
            </div>
            <div class="orderLog">
              <div class="">
                  <div class="box2">
                    
                  </div>
           
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}