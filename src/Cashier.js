import { useState, useEffect } from 'react';
import React from "react";
import './Cashier.css'; // Tell webpack that App.js uses these styles


// Sort of array with all the current listed Items
const baseItems = [{ "item_display_name": "Original Cheeze Pizza", "itemtype_id": 0}, { "item_display_name": "1 Topping Pizza", "itemtype_id": 1 },{ "item_display_name": "2-4 Topping Pizza", "itemtype_id": 2}]
/* Note: Normal crust isn't a real item */
const crustItems = [{ item_display_name: 'Normal Crust', itemtype_id: -1 },  {"itemtype_id": 33,"item_display_name": "Cauliflower Crust","item_price": 2.99,"is_modifier": true,"is_pizza": false,"min_toppings": 0,"max_toppings": 0,"is_topping": false,"is_drizzle": false,"is_drink": false,"is_sauce": false,"is_crust": true}];
const sauceItems = [{ "itemtype_id": 30, "item_display_name": "Alfredo", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }, { "itemtype_id": 31, "item_display_name": "Traditional Red", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }, { "itemtype_id": 32, "item_display_name": "Zesty Red", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }]
const drizzleItems = [{ "itemtype_id": 19, "item_display_name": "BBQ Sauce", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 20, "item_display_name": "Olive Oil", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 21, "item_display_name": "Oregano", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 22, "item_display_name": "Ranch", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 23, "item_display_name": "Siracha", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }]
// const topItems = new Map(meatsItems,veggiesItems);
const topItems = [{ "itemtype_id": 3, "item_display_name": "Diced Ham", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 4, "item_display_name": "Italian Sausage", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 5, "item_display_name": "Meatball", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 6, "item_display_name": "Pepperoni", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 7, "item_display_name": "Salami", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 8, "item_display_name": "Smoked Chicken", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 9, "item_display_name": "Banana Peppers", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 10, "item_display_name": "Black Olives", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 11, "item_display_name": "Green Peppers", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 12, "item_display_name": "Jalapenos", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 13, "item_display_name": "Mushrooms", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 14, "item_display_name": "Onions", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 15, "item_display_name": "Pineapple", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 16, "item_display_name": "Roasted Garlic", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 17, "item_display_name": "Spinach", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 18, "item_display_name": "Tomatoes", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }]



export default function CashierView(props) {
  const [toppingCount, changeCountTop] = useState(0);
  const [crustCount, changeCountCrust] = useState(0);
  const [drizzleCount, changeCountDrizz] = useState(0);
  const [sauceCount, changeCountSauce] = useState(0);
  const [pizzaState, setState] = useState(1);
  const [buttonSelected, setButtonSelected] = useState(false);
  const [selectedStateCrust, setSelectedStateCrust] = useState(Array(crustItems.length).fill(false));
  const [selectedStateSauce, setSelectedStateSauce] = useState(Array(sauceItems.length).fill(false));
  // const [selectedStateMeats,setSelectedStateMeats]=useState(Array(meatsItems.length).fill(false));
  // const [selectedStateVeggies,setSelectedStateVeggies]=useState(Array(veggiesItems.length).fill(false));
  const [selectedStateDrizz, setSelectedStateDrizz] = useState(Array(drizzleItems.length).fill(false));
  const [selectedStateTop, setSelectedStateTop] = useState(Array(topItems.length).fill(false));









  function whenClickedTop(index) {
    if (pizzaState == 1 || pizzaState == 4) {
      null;
    } else if (pizzaState == 2) {
      if (toppingCount < 1) {
        changeCountTop(toppingCount + 1);
      }
      const newSelectedState = Array(topItems.length).fill(false);;//take into account the past array (copies it in)
      newSelectedState[index] = true;//changes its value to the opposite
      setSelectedStateTop(newSelectedState);
    } else if (pizzaState == 3) {
      if (toppingCount < 4) {
        changeCountTop(toppingCount + 1);
      }
      const selectedCount = selectedStateTop.filter(Boolean).length;
      if (selectedCount >= 4) {
        const newSelectedState = [...selectedStateTop];//take into account the past array (copies it in)\
        if (newSelectedState[index] == true) {//checks if they wanna press on a button already pressed
          newSelectedState[index] = !newSelectedState[index];//changes its value to the opposite
          setSelectedStateTop(newSelectedState);
          changeCountTop(toppingCount - 1);//lowers the counter by one
        } else {//if their trying to press a new button they arent allowed
          return;
        }
      }
      // setButtonSelected(!buttonSelected);
      const newSelectedState = [...selectedStateTop];//take into account the past array (copies it in)
      newSelectedState[index] = !newSelectedState[index];//changes its value to the opposite
      setSelectedStateTop(newSelectedState);
    }
  }

  function whenClickedCrust(index) {
    if (crustCount < 1) {
      changeCountCrust(crustCount + 1);
    }
    // setButtonSelected(!buttonSelected);
    // setSelectedStateCrust[index]=!setSelectedStateCrust[index];

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(crustItems.length).fill(false);//restarts the array with false
    newSelectedState[index] = true;
    setSelectedStateCrust(newSelectedState);

  }
  function whenClickedDrizz(index) {
    if (drizzleCount < 1) {
      changeCountDrizz(drizzleCount + 1);
    }
    // setButtonSelected(!buttonSelected);
    // setSelectedStateDrizz[index]=!setSelectedStateDrizz[index];  

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(drizzleItems.length).fill(false);
    newSelectedState[index] = true;
    setSelectedStateDrizz(newSelectedState);
  }
  function whenClickedSauce(index) {
    if (sauceCount < 1) {
      changeCountSauce(sauceCount + 1);
    }
    // setButtonSelected(!buttonSelected);
    // setSelectedStateSauce[index]=!setSelectedStateSauce[index];

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(sauceItems.length).fill(false);
    newSelectedState[index] = true;
    setSelectedStateSauce(newSelectedState);
  }

  function returnID(newState) {
    setState(newState);
    // Reset the topping count when the pizza state changes
    changeCountTop(0);
    changeCountSauce(0);
    changeCountDrizz(0);
    changeCountCrust(0);

    const newSelectedState = Array(drizzleItems.length).fill(false);
    setSelectedStateDrizz(newSelectedState);
    const newSelectedState2 = Array(sauceItems.length).fill(false);
    setSelectedStateSauce(newSelectedState2);
    const newSelectedState3 = Array(crustItems.length).fill(false);//restarts the array with false
    setSelectedStateCrust(newSelectedState3);
    const newSelectedState4 = Array(topItems.length).fill(false);;//take into account the past array (copies it in)
    setSelectedStateTop(newSelectedState4);


  }

  function createButton(baseItem, whenClick, buttonClass, selectedState, index) {
    return <button onClick={() => whenClick(index - 1)} role="button" class={selectedState[index - 1] ? 'selected' : buttonClass} key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>
  }

  function CountingFunction({ id }) {
    if (id === 1) {
      return <div class="counter"><div class="red">Crust ({crustCount}/1)</div> <div class="orange">Sauce ({sauceCount}/1)</div> <div class="pink">Drizzle ({drizzleCount}/1)</div></div>;
    } else if (id === 2) {
      return <div class="counter"><div class="red">Crust ({crustCount}/1)</div> <div class="orange">Sauce ({sauceCount}/1)</div> <div class="blue">Toppings ({toppingCount}/1)</div> <div class="pink">Drizzle ({drizzleCount}/1)</div></div>;
    } else if (id === 3) {
      return <div class="counter"><div class="red">Crust ({crustCount}/1)</div> <div class="orange">Sauce ({sauceCount}/1)</div> <div class="blue">Toppings ({toppingCount}/4)</div> <div class="pink">Drizzle ({drizzleCount}/1)</div></div>;
    } else {
      return null;
    }
  }


  const listItems = baseItems.map(baseItems => <button onClick={() => returnID(baseItems.itemtype_id)} role="button" class="button-nameBase" key={baseItems.itemtype_id}> {baseItems.item_display_name}</button>);

  const listItemsCrust = crustItems.map(baseItem => createButton(baseItem, whenClickedCrust, "button-nameC", selectedStateCrust, baseItem.itemtype_id));

  const listItemsSauce = sauceItems.map(baseItem => createButton(baseItem, whenClickedSauce, "button-name2", selectedStateSauce, baseItem.itemtype_id));

  const listItemsTop = topItems.map(baseItem => createButton(baseItem, whenClickedTop, "button-name4", selectedStateTop, baseItem.itemtype_id));

  // const listItemsMeats = meatsItems.map(baseItem => createButton(baseItem, whenClickedTop, "button-name3", selectedStateMeats, baseItem.itemtype_id));

  // const listItemsVeggies = veggiesItems.map(baseItem => createButton(baseItem, whenClickedTop,"button-name4", selectedStateVeggies, baseItem.itemtype_id));
  1
  const listItemsDrizzle = drizzleItems.map(baseItem => createButton(baseItem, whenClickedDrizz, "button-name5", selectedStateDrizz, baseItem.itemtype_id));

  const exit = <div class="exit"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_text">Exit</button></div>
  return (
    //Parent Element
    <div>
      <div class="backgroundBland">
        {exit}
        <h3>Cashier's Window</h3>
        <CountingFunction id={pizzaState} />
        <div class="baseSection">
          <div class="gridMover">
            <div class="grid-container">
              {listItems}
            </div>
          </div>
          <div class="toppingsSection">
            <div class="gridMoverToppings">
              <div class="grid-containerToppings">
                {listItemsCrust}{listItemsSauce}{listItemsTop}{listItemsDrizzle}
              </div>
            </div>
          </div>
          <div class="orderLog">
            <div class="box2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}