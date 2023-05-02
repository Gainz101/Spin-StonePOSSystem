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

/* Note: Normal crust isn't a real item */
const crustItems = [{ item_display_name: 'Normal Crust', itemtype_id: -1 }, { "itemtype_id": 33, "item_display_name": "Cauliflower Crust", "item_price": 2.99, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": true }];

// Drinks defined


/**
 * @param props
 * @returns the Cashier view
 */
export default function CashierView(props) {
    ///Drink Item Drop Down
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrinkClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
  const handleDrinkClose = () => {
      setAnchorEl(null);
    };

    ///Seasonal Item Drop Down
  const [anchorSeasonalEl, setAnchorSeasonalEl] = useState(null);

  const handleSeasonalClick = (event) => {
      setAnchorSeasonalEl(event.currentTarget);
    };
  
  const handleSeasonalClose = () => {
      setAnchorSeasonalEl(null);
    };

    // Items Modifiers
  const [itemtypes, setItemtypes] = useState([])

  const sauceItems = itemtypes.filter((item) => item.is_sauce)
  const drizzleItems = itemtypes.filter((item) => item.is_drizzle)
  const topItems = itemtypes.filter((item) => item.is_topping)
  const baseItems = itemtypes.filter((item) => item.is_pizza).sort((a,b)=>a.itemtype_id < b.itemtype_id)

  const [toppingCount, changeCountTop] = useState(0);
  const [crustCount, changeCountCrust] = useState(0);
  const [drizzleCount, changeCountDrizz] = useState(0);
  const [sauceCount, changeCountSauce] = useState(0);
  const [pizzaState, setPizzaState] = useState(0);
  const [selectedStateCrust, setSelectedStateCrust] = useState(Array(crustItems.length).fill(false));
  const [selectedStateSauce, setSelectedStateSauce] = useState(Array(sauceItems.length).fill(false));
  const [selectedStateDrizz, setSelectedStateDrizz] = useState(Array(drizzleItems.length).fill(false));
  const [selectedStateTop, setSelectedStateTop] = useState(Array(topItems.length).fill(false));
  const [selectedStateBase, setSelectedStateBase] = useState(Array(baseItems.length).fill(false));
  const [currentOrder, setCurrentOrder] = useState(null);



  const drinkItems = itemtypes.filter((item) => item.is_drink)

  /* Use effect makes it so that this code is only run once when the CashierView is shown */
  useEffect(() => {
    // This code is only run once
    // Create a new order for the backend
    fetch(BACKEND_IP + "/order/new").then((res) => res.json()).then(order => {
      // Update the current order state
      setCurrentOrder(order)
    }, alert)

    fetch(BACKEND_IP + "/itemTypes")
    .then((res) => res.json())
    .then((jsonItems) => {
      console.log(jsonItems)

      setItemtypes(jsonItems)
    },
      (error) => {
        console.log("error:", error)
        alert(error);
      })

  }, []) // You need the brackets at the end so it doesn't do it multiple times
/**
 * @param index which is the item.id
 * @returns nothing but it keep the counter in check and updates the arrays for the buttons
 */
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
  /**
 * @param index which is the item.id
 * @returns nothing but it keep the counter in check and updates the arrays for the buttons
 */
  function whenClickedCrust(index) {
    if (crustCount < 1) {
      changeCountCrust(crustCount + 1);
    }

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(crustItems.length).fill(false);//restarts the array with false
    newSelectedState[index] = true;
    setSelectedStateCrust(newSelectedState);

  }

  /**
 * @param index which is the item.id
 * @returns nothing but it keep the counter in check and updates the arrays for the buttons
 */
  function whenClickedDrizz(index) {
    if (drizzleCount < 1) {
      changeCountDrizz(drizzleCount + 1);
    }


    // Set the selected state of the clicked button to true
    const newSelectedState = Array(drizzleItems.length).fill(false);
    newSelectedState[index] = true;
    setSelectedStateDrizz(newSelectedState);
  }

  /**
 * @param index which is the item.id
 * @returns nothing but it keep the counter in check and updates the arrays for the buttons
 */
  function whenClickedSauce(index) {
    if (sauceCount < 1) {
      changeCountSauce(sauceCount + 1);
    }

    // Set the selected state of the clicked button to true
    const newSelectedState = Array(sauceItems.length).fill(false);
    newSelectedState[index] = true;
    setSelectedStateSauce(newSelectedState);
  }

  /**
 * @param newState which is the item.id
 * @returns nothing but it updates the pizza state, resets the counts, and resets the button arrays
 */
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

  /**
 * @param baseItem
 * @param whenClick
 * @param buttonClass
 * @param selectedState
 * @param index 
 * @returns A button
 */
  function createButton(baseItem, whenClick, buttonClass, selectedState, index) {
    return <button onClick={() => whenClick(index - 1)} role="button" class={selectedState[index - 1] ? 'selected' : buttonClass} key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>
  }

  /**
 * @param baseItem
 * @param whenClick
 * @param buttonClass
 * @param selectedState
 * @param index 
 * @returns A button
 */
  function createButtonBase(baseItem, whenClick, buttonClass, selectedState, index) {
    return <button onClick={() => whenClick(index)} role="button" class={selectedState[index] ? 'selectedBase' : buttonClass} key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>
  }

  /**
 * @param id 
 * @returns The counter seen at the top of the cashier page
 */
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



  const listItems = baseItems.map(baseItem => createButtonBase(baseItem, returnID, "button-nameBase", selectedStateBase, baseItem.itemtype_id));

  const listItemsCrust = crustItems.map(crustItem => createButton(crustItem, whenClickedCrust, "button-nameC", selectedStateCrust, crustItem.itemtype_id));

  const listItemsSauce = sauceItems.map(sauceItem => createButton(sauceItem, whenClickedSauce, "button-name2", selectedStateSauce, sauceItem.itemtype_id));

  const listItemsTop = topItems.map(topItem => createButton(topItem, whenClickedTop, "button-name4", selectedStateTop, topItem.itemtype_id));

  // const listItemsMeats = meatsItems.map(baseItem => createButton(baseItem, whenClickedTop, "button-name3", selectedStateMeats, baseItem.itemtype_id));

  // const listItemsVeggies = veggiesItems.map(baseItem => createButton(baseItem, whenClickedTop,"button-name4", selectedStateVeggies, baseItem.itemtype_id));

  const listItemsDrizzle = drizzleItems.map(baseItem => createButton(baseItem, whenClickedDrizz, "button-name5", selectedStateDrizz, baseItem.itemtype_id));

  const exit = <div class="exitC"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_textC">Exit</button></div>

  /**
 * @returns pizza item id and set the current order
 */
  function AddToOrder() {
    // For each item selected button, get it's itemtypeId
    const PizzaId = pizzaState
    const PizzaModifiers = [listItemsCrust, listItemsDrizzle, listItemsSauce, listItemsTop]
      .flat()
      .filter((reactObject) => reactObject.props.class == 'selected')
      .map((reactObject) => parseInt(reactObject.key))
      .filter((itemTypeId) => itemTypeId > 0) // Exclude normal crust (-1)

    // Destructure the order_id from currentOrder into it's own varaible
    const {
      order_id
    } = currentOrder;
    if (PizzaModifiers.length === 0) {
      alert("Add more toppings!");
      return;
    } else {
      // First do a query to add the Pizza to the order
      // Then do query to add the modifiers to the order
      fetch(`${BACKEND_IP}/order/addItem?order_id=${order_id}&itemtype_ids=${PizzaId}`).then((res => res.json())).then((new_order_state1) => {
        /// new order state1 is the response when we add 
        const { new_items } = new_order_state1;
        // new items is an array of the item ids that were just added
        // its length is only 1 because we only added the base pizza
        const pizza_item_id = new_items[0];

        return pizza_item_id
      }).then((pizza_item_id) => {
        fetch(`${BACKEND_IP}/order/addItem?order_id=${order_id}&itemtype_ids=${PizzaModifiers.join(",")}&root_item_id=${pizza_item_id}`)
          .then((res) => res.json())
          .then((responseJSON) => {
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
    (currentOrder == null || itemtypes.length == 0) ?
      // Show "loading" if current order or itemtypes is null
      <h1> Loading... </h1>
      :
      <div>
        <div class="backgroundBland">
          <div class="titleContainer">
            {exit}
          </div>
          <h3>Cashier's Window</h3>
          <CountingFunction id={pizzaState} />
          <div class="baseSection">
            <div class="gridMover">
              <div class="grid-container">
                {listItems}
                {/*DRINKS */}
                <div>
                <button class = "button-nameBase" onClick={handleDrinkClick}>Drink</button>
                <Menu
                  id="demo-simple-select-outlined"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleDrinkClose}
                >
                  <div style = {{width: "220px"}}>
                  <MenuItem onClick={handleDrinkClose}>Pepsi</MenuItem>
                  <MenuItem onClick={handleDrinkClose}>Starry</MenuItem>
                  <MenuItem onClick={handleDrinkClose}>Mountain Dew</MenuItem>
                  </div>
                </Menu>
                </div>
      
                {/** Seasonal Item*/}
                <div>
                <button class = "button-nameBase" onClick={handleSeasonalClick}>Seasonal Items</button>
                <Menu
                  id="demo-simple-select-outlined"
                  anchorEl={anchorSeasonalEl}
                  keepMounted
                  open={Boolean(anchorSeasonalEl)}
                  onClose={handleSeasonalClose}
                >
                  <div style = {{width: "220px"}}>
                  <MenuItem onClick={handleSeasonalClose}>Christmas Pizza</MenuItem>
                  <MenuItem onClick={handleSeasonalClose}>New Item</MenuItem>
                  <MenuItem onClick={handleSeasonalClose}>New Item #2</MenuItem>
                  </div>
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
                  currentOrder.items.map(({ item_display_name, item_price, modifiers, item_id }) => {
                    return <div>
                      <div>
                        <div class="item-name">{item_display_name}</div>
                        <div class="item-price">{item_price == 0 ? "" : item_price.toFixed(2)}</div>
                      </div>


                      {modifiers.map(({ item_display_name: modifier_name, item_price: modifier_price }) =>

                        <div class="modifier">
                          {/* Modifier name */}
                          Modifier: {modifier_name}
                          {/* Modifier price */}
                          {modifier_price == 0 ? "" : modifier_price.toString()}
                        </div>

                        // Add remove item button
                      )}
                      <button role="button" class="button-namePay" onClick={
                        () => {
                          fetch(`${BACKEND_IP}/order/removeItem?order_id=${currentOrder.order_id}&item_id=${item_id}`)
                            .then((res) => res.json())
                            .then((responseJSON) => {
                              // Refresh the component with the new order items by setting the order state
                              setCurrentOrder(responseJSON)
                            })

                        }
                      }>Delete Item</button>
                      <br></br>
                      <br></br>
                    </div>
                  })
                }
                <div class="total">
                {currentOrder.subtotal===0?
                  null:
                  <><hr></hr></>
                }
                
                {"Subtotal = " + currentOrder.subtotal.toFixed(2)} 
                {" Taxes = " + currentOrder.taxes.toFixed(2)} 
                {" Total = " + currentOrder.total.toFixed(2)}   
                </div></div>
                
                <div class="buttonsLayout">
                  <button role="button" class="button-namePay" onClick={() => {
                    setCurrentOrder(null)
                    fetch(BACKEND_IP + "/order/new").then((res) => res.json()).then(order => {
                      // Update the current order state
                      setCurrentOrder(order)
                    }, alert)
                  }}
                  >Delete Order</button>
                  <button role="button" class="button-namePay" onClick={AddToOrder}>Add to Order</button>
                </div>

                <button role="button" class="button-namePayCheckout" onClick={
                  () => {
                    // This code is only run once
                    // Create a new order for the backend
                    fetch(BACKEND_IP + "/order/complete?order_id=" + currentOrder.order_id).then(order => {

                    }, alert).then(() => {
                      fetch(BACKEND_IP + "/order/new").then((res) => res.json()).then(order => {
                        // Update the current order state
                        setCurrentOrder(order)
                      }, alert)
                    })

                  }
                }>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}