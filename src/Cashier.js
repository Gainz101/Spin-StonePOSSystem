import { useState, useEffect } from 'react';
import React from "react";
import './Cashier.css'; // Tell webpack that App.js uses these styles
import { BACKEND_IP } from './BackendConnection.js';
import {Menu, MenuItem } from '@material-ui/core';

const PIZZA_STATE_CHEESE = 0;
const PIZZA_STATE_ONE_TOPPING = 1;
const PIZZA_STATE_TWOFOUR_TOPPING = 2;


// Drink should not be part of pizza state
const PIZZA_STATE_DRINK = 3;

// Sort of array with all the current listed Items
const baseItems = [{ "item_display_name": "Original Cheeze Pizza", "itemtype_id": 0}, { "item_display_name": "1 Topping Pizza", "itemtype_id": 1 },{ "item_display_name": "2-4 Topping Pizza", "itemtype_id": 2}]
/* Note: Normal crust isn't a real item */
const crustItems = [{ item_display_name: 'Normal Crust', itemtype_id: -1 },  {"itemtype_id": 33,"item_display_name": "Cauliflower Crust","item_price": 2.99,"is_modifier": true,"is_pizza": false,"min_toppings": 0,"max_toppings": 0,"is_topping": false,"is_drizzle": false,"is_drink": false,"is_sauce": false,"is_crust": true}];
const sauceItems = [{ "itemtype_id": 30, "item_display_name": "Alfredo", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }, { "itemtype_id": 31, "item_display_name": "Traditional Red", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }, { "itemtype_id": 32, "item_display_name": "Zesty Red", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }]
const drizzleItems = [{ "itemtype_id": 19, "item_display_name": "BBQ Sauce", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 20, "item_display_name": "Olive Oil", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 21, "item_display_name": "Oregano", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 22, "item_display_name": "Ranch", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 23, "item_display_name": "Siracha", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": true, "is_drink": false, "is_sauce": false, "is_crust": false }]
// const topItems = new Map(meatsItems,: 5);
const topItems = [{ "itemtype_id": 3, "item_display_name": "Diced Ham", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 4, "item_display_name": "Italian Sausage", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 5, "item_display_name": "Meatball", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 6, "item_display_name": "Pepperoni", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 7, "item_display_name": "Salami", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 8, "item_display_name": "Smoked Chicken", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 9, "item_display_name": "Banana Peppers", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 10, "item_display_name": "Black Olives", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 11, "item_display_name": "Green Peppers", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 12, "item_display_name": "Jalapenos", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 13, "item_display_name": "Mushrooms", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 14, "item_display_name": "Onions", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 15, "item_display_name": "Pineapple", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 16, "item_display_name": "Roasted Garlic", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 17, "item_display_name": "Spinach", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }, { "itemtype_id": 18, "item_display_name": "Tomatoes", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": true, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": false }]

const itemTypes = [
  ...baseItems, ...crustItems, ...sauceItems, ...drizzleItems, ...topItems
]

export default function CashierView(props) {
  //Left Side Seasonal Item drop down
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  // Right Button useStates
  const [toppingCount, changeCountTop] = useState(0);
  const [crustCount, changeCountCrust] = useState(0);
  const [drizzleCount, changeCountDrizz] = useState(0);
  const [sauceCount, changeCountSauce] = useState(0);
  const [pizzaState, setPizzaState] = useState(0);
  const [selectedStateCrust, setSelectedStateCrust] = useState(Array(crustItems.length).fill(false));
  const [selectedStateSauce, setSelectedStateSauce] = useState(Array(sauceItems.length).fill(false));
  // const [selectedStateMeats,setSelectedStateMeats] = useState(Array(meatsItems.length).fill(false));
  // const [selectedStateVeggies,setSelectedStateVeggies] = useState(Array(veggiesItems.length).fill(false));
  const [selectedStateDrizz, setSelectedStateDrizz] = useState(Array(drizzleItems.length).fill(false));
  const [selectedStateTop, setSelectedStateTop] = useState(Array(topItems.length).fill(false));
  const [selectedStateBase, setSelectedStateBase] = useState(Array(baseItems.length).fill(false));


  const [currentOrder, setCurrentOrder] = useState(null)



  /* Use effect makes it so that this code is only run once when the CashierView is shown */
  useEffect(()=>{
    // This code is only run once
    // Create a new order for the backend
    fetch(BACKEND_IP + "/order/new").then((res)=>res.json()).then(order=>{ 
      // Update the current order state
      setCurrentOrder(order)
    }, alert)

  }, []) // You need the brackets at the end so it doesn't do it multiple times

  function whenClickedTop(index) {
    if (pizzaState == PIZZA_STATE_CHEESE || pizzaState == PIZZA_STATE_DRINK) {
      null;
    } else if (pizzaState == PIZZA_STATE_ONE_TOPPING) {
      if (toppingCount < 1) {
        changeCountTop(toppingCount + 1);
      }
      const newSelectedState = Array(topItems.length).fill(false);//take into account the past array (copies it in)
      newSelectedState[index] = true;//changes its value to the opposite
      setSelectedStateTop(newSelectedState);
    } else if (pizzaState == PIZZA_STATE_TWOFOUR_TOPPING) {
      const newSelectedState = [...selectedStateTop];//take into account the past array (copies it in)
      if (toppingCount < 4) {
        changeCountTop(toppingCount + 1);
        if (newSelectedState[index] == true) {//checks if they wanna press on a button already pressed
          changeCountTop(toppingCount - 1);//lowers the counter by one
        }
      }
      const selectedCount = selectedStateTop.filter(Boolean).length;
      if (selectedCount >= 4) {
        if (newSelectedState[index] == true) {//checks if they wanna press on a button already pressed
          changeCountTop(toppingCount - 1);//lowers the counter by one
        } else {//if their trying to press a new button they arent allowed
          return;
        }
      }
      newSelectedState[index] = !newSelectedState[index];//changes its value to the opposite
      setSelectedStateTop(newSelectedState);
    }
  }

  function whenClickedCrust(index) {
    if (crustCount < 1) {
      changeCountCrust(crustCount + 1);
    }

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(crustItems.length).fill(false);//restarts the array with false
    newSelectedState[index] = true;
    setSelectedStateCrust(newSelectedState);

  }
  function whenClickedDrizz(index) {
    if (drizzleCount < 1) {
      changeCountDrizz(drizzleCount + 1);
    }


    // Set the selected state of the clicked button to true
    const newSelectedState = Array(drizzleItems.length).fill(false);
    newSelectedState[index] = true;
    setSelectedStateDrizz(newSelectedState);
  }
  function whenClickedSauce(index) {
    if (sauceCount < 1) {
      changeCountSauce(sauceCount + 1);
    }

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(sauceItems.length).fill(false);
    newSelectedState[index] = true;
    setSelectedStateSauce(newSelectedState);
  }

  function returnID(newState) {
    setPizzaState(newState);
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
    
    const newSelectedStateBase = Array(baseItems.length).fill(false);
    // <button onClick={() => returnID(baseItem.itemtype_id)} role="button" class="button-nameBase" key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>);
    newSelectedStateBase[newState] = true;
    setSelectedStateBase(newSelectedStateBase);
  }
  
  function createButton(baseItem, whenClick, buttonClass, selectedState, index) {
    return <button onClick={() => whenClick(index - 1)} role="button" class={selectedState[index - 1] ? 'selected' : buttonClass} key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>
  }
  function createButtonBase(baseItem, whenClick, buttonClass, selectedState, index) {
    return <button onClick={() => whenClick(index)} role="button" class={selectedState[index] ? 'selectedBase' : buttonClass} key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>
  }
    
  function CountingFunction({ id }) {
    if (id === PIZZA_STATE_CHEESE) {
      return <div class="counter"><div class="red">Crust ({crustCount}/1)</div> <div class="orange">Sauce ({sauceCount}/1)</div> <div class="pink">Drizzle ({drizzleCount}/1)</div></div>;
    } else if (id === PIZZA_STATE_ONE_TOPPING) {
      return <div class="counter"><div class="red">Crust ({crustCount}/1)</div> <div class="orange">Sauce ({sauceCount}/1)</div> <div class="blue">Toppings ({toppingCount}/1)</div> <div class="pink">Drizzle ({drizzleCount}/1)</div></div>;
    } else if (id === PIZZA_STATE_TWOFOUR_TOPPING) {
      return <div class="counter"><div class="red">Crust ({crustCount}/1)</div> <div class="orange">Sauce ({sauceCount}/1)</div> <div class="blue">Toppings ({toppingCount}/4)</div> <div class="pink">Drizzle ({drizzleCount}/1)</div></div>;
    } else {
      return null;
    }
  }

  function ExtractItemIds(boolArray) {
    let ret = [];
  
    // Expected output: Array [0, "a"]
    for (const [itemId, itemSelected] of boolArray.entries()) {
      if(itemSelected) {
        ret.push(itemId)
      }
      
    }
    return ret;
  }

  

  const listItems = baseItems.map(baseItem =>createButtonBase(baseItem,returnID, "button-nameBase", selectedStateBase,baseItem.itemtype_id));

  const listItemsCrust = crustItems.map(crustItem => createButton(crustItem, whenClickedCrust, "button-nameC", selectedStateCrust, crustItem.itemtype_id));

  const listItemsSauce = sauceItems.map(sauceItem => createButton(sauceItem, whenClickedSauce, "button-name2", selectedStateSauce, sauceItem.itemtype_id));

  const listItemsTop = topItems.map(topItem => createButton(topItem, whenClickedTop, "button-name4", selectedStateTop, topItem.itemtype_id));

  // const listItemsMeats = meatsItems.map(baseItem => createButton(baseItem, whenClickedTop, "button-name3", selectedStateMeats, baseItem.itemtype_id));

  // const listItemsVeggies = veggiesItems.map(baseItem => createButton(baseItem, whenClickedTop,"button-name4", selectedStateVeggies, baseItem.itemtype_id));

  const listItemsDrizzle = drizzleItems.map(baseItem => createButton(baseItem, whenClickedDrizz, "button-name5", selectedStateDrizz, baseItem.itemtype_id));

  const exit = <div class="exitC"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_textC">Exit</button></div>

  
  function AddToOrder() {

    
    // For each item selected button, do XYZ
    const PizzaId = pizzaState
    const PizzaModifiers = [listItemsCrust, listItemsDrizzle, listItemsSauce, listItemsTop].flat().filter((x)=>x.props.class == 'selected').map((x)=>parseInt(x.key)).filter((x)=>x>0)
  
    // Destructure the order_id from currentOrder into it's own varaible
    const {
      order_id
    } = currentOrder;
    if (PizzaModifiers.length === 0) {
      alert("Add more toppings");
      return;
    }else{
      // First do a query to add the Pizza to the order
      // Then do query to add the modifiers to the order
      fetch(`${BACKEND_IP}/order/addItem?order_id=${order_id}&itemtype_ids=${PizzaId}`).then((res=>res.json())).then((new_order_state1)=>{
        /// new order state1 is the response when we add 
        const { new_items } = new_order_state1;
        // new items is an array of the item ids that were just added
        // its length is only 1 because we only added the base pizza
        const pizza_item_id = new_items[0];

        return pizza_item_id
      }).then((pizza_item_id)=>{
        fetch(`${BACKEND_IP}/order/addItem?order_id=${order_id}&itemtype_ids=${PizzaModifiers.join(",")}&root_item_id=${pizza_item_id}`)
        .then((res)=>res.json())
        .then((responseJSON)=>{
          // Refresh the component with the new order items by setting the order state
          setCurrentOrder(responseJSON.entire_order)
        })
      })
      // console.log()
      // fetch(backend/order/item?add=).then((res)=>{
      //  
      //  res.json()
      //}).then((order)=>{
      //    setCurrentOrder(order)
      // })
    }
    
  }



  return (
    //Parent Element
    currentOrder == null ?
      // Show "loading" if current order is null
      <h1> Loading... </h1>
    :
    <div>
      <div class="backgroundBland">

        <div class ="titleContainer">
          {exit}

        </div>
        <h3>Cashier's Window</h3>

        <CountingFunction id={pizzaState} />
        <div class="baseSection">
          <div class="gridMover">
            <div class="grid-container">
              {listItems}
              {/** NEED TO ADD SEAONAL ITEM DROP DOWN AND DRINK DROP DOWN*/}
              <div class="grid-container">
              <button onClick={handleClick}>Seasonal Item</button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Christma Pizza</MenuItem>
                <MenuItem onClick={handleClose}>New Item</MenuItem>
                <MenuItem onClick={handleClose}>New Item</MenuItem>
              </Menu>
              </div>
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
          <div class="payButtonsContainer">
            <div class="box2">{
              //JSON.stringify(currentOrder)
              // Map the order items into 
              currentOrder.items.map(({item_display_name, item_price, modifiers, item_id})=>{
                return <div class="item">
                {/* Item name */}
                {item_display_name}

                {/* Item price */}
                {item_price == 0 ? "" : item_price.toString()}
            

                  {modifiers.map(({item_display_name: modifier_name, item_price: modifier_price})=>
                  
                    <div class="modifier">
                    {/* Modifier name */}
                    Modifier: {
                    modifier_name} 
                    {/* Modifier price */}
                    {modifier_price == 0 ? "" : modifier_price.toString()}</div>

                    // Add remove item button
                    
                  )}



              
              <button role="button" class="button-namePay" onClick={
                                ()=>{
                                  fetch(`${BACKEND_IP}/order/removeItem?order_id=${currentOrder.order_id}&item_id=${item_id}`)
                                  .then((res)=>res.json())  
                                  .then((responseJSON)=>{
                                    // Refresh the component with the new order items by setting the order state
                                    setCurrentOrder(responseJSON)
                                  })
                                  
                                }
                              }>Delete Item</button>
                </div>
              })
}</div>
{"Subtotal = " + currentOrder.subtotal}
              {"Taxes = " + currentOrder.taxes}
              {"Total = " + currentOrder.total}   <div class="buttonsLayout">
            <button role="button" class="button-namePay">Delete Order</button>
            <button role="button" class="button-namePay" onClick={AddToOrder}>Add to Order</button>
            <button role="button" class="button-namePay" onClick={
                ()=>{
                  // This code is only run once
                  // Create a new order for the backend
                  fetch(BACKEND_IP + "/order/complete?order_id=" + currentOrder.order_id).then(order=>{ 
                    // Update the current order state
                    
                  }, alert).then(()=>{
                    fetch(BACKEND_IP + "/order/new").then((res)=>res.json()).then(order=>{ 
                      // Update the current order state
                      setCurrentOrder(order)
                    }, alert)
                  })

                }
            }>Check out</button>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}