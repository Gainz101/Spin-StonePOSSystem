import { useState, useEffect } from 'react';
import React from "react";
import './Cashier.css'; // Tell webpack that App.js uses these styles


// Sort of array with all the current listed Items
const baseItems = [{ item: 'Cheese Pizza', id: 1 }, { item: '1 Topping Pizza', id: 2 }, { item: '2-4 Topping Pizza', id: 3 }, { item: 'Drink', id: 4 }];
const crustItems = [{item: 'Normal Crust', id: 1}, {item:'Cauliflower Crust', id: 2}];
const sauceItems = [{item: 'Alfredo', id: 1}, {item:'Traditional Red', id: 2}, {item:'Zesty Red', id: 3}];
const meatsItems = [{item: 'Italian Sausage', id: 1}, {item:'Meatball', id: 2}, {item:'Pepperoni', id: 3}, {item:'Salami', id: 4}, {item:'Smoked Chicken', id: 5}];
const veggiesItems = [{item: 'Green Peppers', id: 1}, {item:'Black Olives', id: 2}, {item:'Banana Peppers', id: 3}, {item:'Jalapenos', id: 4}, {item:'Mushrooms', id: 5}, {item:'Onions', id: 6}];
const drizzleItems = [{item: 'BBQ Sauce', id: 1}, {item:'Olive Oil', id: 2}, {item:'Siracha', id: 3}, {item:'Ranch', id: 4}, {item:'Oregano', id: 5}];
// const topItems = new Map(meatsItems,veggiesItems);
const topItems =[{item: 'Italian Sausage', id: 1}, {item:'Meatball', id: 2}, {item:'Pepperoni', id: 3}, {item:'Salami', id: 4}, {item:'Smoked Chicken', id: 5},{item: 'Green Peppers', id: 6}, {item:'Black Olives', id: 7}, {item:'Banana Peppers', id: 8}, {item:'Jalapenos', id: 9}, {item:'Mushrooms', id: 10}, {item:'Onions', id: 11}];



export default function CashierView(props) {
  const [toppingCount, changeCountTop] = useState(0);
  const [crustCount, changeCountCrust] = useState(0);
  const [drizzleCount, changeCountDrizz] = useState(0);
  const [sauceCount, changeCountSauce] = useState(0);
  const [pizzaState, setState] = useState(1);
  const [buttonSelected, setButtonSelected]=useState(false);
  const [selectedStateCrust,setSelectedStateCrust]=useState(Array(crustItems.length).fill(false));
  const [selectedStateSauce,setSelectedStateSauce]=useState(Array(sauceItems.length).fill(false));
  // const [selectedStateMeats,setSelectedStateMeats]=useState(Array(meatsItems.length).fill(false));
  // const [selectedStateVeggies,setSelectedStateVeggies]=useState(Array(veggiesItems.length).fill(false));
  const [selectedStateDrizz,setSelectedStateDrizz]=useState(Array(drizzleItems.length).fill(false));
  const [selectedStateTop,setSelectedStateTop]=useState(Array(topItems.length).fill(false));





  

  

  function whenClickedTop(index){
    if(pizzaState==1||pizzaState==4){
      null;
    }else if(pizzaState==2){
      if (toppingCount < 1) {
        changeCountTop(toppingCount + 1);
      } 
      const newSelectedState = Array(topItems.length).fill(false);;//take into account the past array (copies it in)
      newSelectedState[index] = true;//changes its value to the opposite
      setSelectedStateTop(newSelectedState);
    }else if(pizzaState==3){
      if (toppingCount < 4) {
        changeCountTop(toppingCount + 1);
      } 
      const selectedCount = selectedStateTop.filter(Boolean).length;
      if (selectedCount >= 4) {
        const newSelectedState = [...selectedStateTop];//take into account the past array (copies it in)\
        if(newSelectedState[index]==true){
          newSelectedState[index] = !newSelectedState[index];//changes its value to the opposite
          setSelectedStateTop(newSelectedState);
        }else{
          return;
        }
      }
      // setButtonSelected(!buttonSelected);
      const newSelectedState = [...selectedStateTop];//take into account the past array (copies it in)
      newSelectedState[index] = !newSelectedState[index];//changes its value to the opposite
      setSelectedStateTop(newSelectedState);
    }
  }

  function whenClickedCrust(index){
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
  function whenClickedDrizz(index){
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
  function whenClickedSauce(index){
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

  function returnID(newState){
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
  
  function createButton(baseItem, whenClick, buttonClass, selectedState, index){
    return <button onClick={() => whenClick(index-1)} role="button" class={selectedState[index-1] ? 'selected' : buttonClass} key={baseItem.id}> {baseItem.item}</button>
  }

  function CountingFunction({id}){
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
  
  
  const listItems = baseItems.map(baseItems => <button onClick={() => returnID(baseItems.id)} role="button" class="button-nameBase" key={baseItems.id}> {baseItems.item}</button>);
  
  const listItemsCrust = crustItems.map(baseItem => createButton(baseItem, whenClickedCrust, "button-nameC", selectedStateCrust, baseItem.id));

  const listItemsSauce = sauceItems.map(baseItem => createButton(baseItem, whenClickedSauce, "button-name2", selectedStateSauce, baseItem.id));
  
  const listItemsTop = topItems.map(baseItem => createButton(baseItem, whenClickedTop, "button-name4", selectedStateTop, baseItem.id));

  // const listItemsMeats = meatsItems.map(baseItem => createButton(baseItem, whenClickedTop, "button-name3", selectedStateMeats, baseItem.id));

  // const listItemsVeggies = veggiesItems.map(baseItem => createButton(baseItem, whenClickedTop,"button-name4", selectedStateVeggies, baseItem.id));
1
  const listItemsDrizzle = drizzleItems.map(baseItem => createButton(baseItem, whenClickedDrizz, "button-name5", selectedStateDrizz, baseItem.id));

  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_text">Exit</button></div>
  return (
    //Parent Element
    <div>
      <div class="backgroundBland">
        {exit}
        <h3>Cashier's Window</h3>
        <CountingFunction id={pizzaState}/>
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