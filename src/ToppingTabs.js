import { useState } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles

const crustItems = [{ item: 'Normal Crust', id: 1 }, { item: 'Cauliflower Crust', id: 2 }];
// const sauceItems = itemtypes.filter((itemtype)=>itemtype.is_sauce);
const sauceItems = [{ "itemtype_id": 30, "item_display_name": "Alfredo", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }, { "itemtype_id": 31, "item_display_name": "Traditional Red", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }, { "itemtype_id": 32, "item_display_name": "Zesty Red", "item_price": 0, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": true, "is_crust": false }]

const meatsItems = [{ item: 'Italian Sausage', id: 1 }, { item: 'Meatball', id: 2 }, { item: 'Pepperoni', id: 3 }, { item: 'Salami', id: 4 }, { item: 'Smoked Chicken', id: 5 }];
const veggiesItems = [{ item: 'Green Peppers', id: 1 }, { item: 'Black Olives', id: 2 }, { item: 'Banana Peppers', id: 3 }, { item: 'Jalapenos', id: 4 }, { item: 'Mushrooms', id: 5 }, { item: 'Onions', id: 6 }];
const drizzleItems = [{ item: 'BBQ Sauce', id: 1 }, { item: 'Olive Oil', id: 2 }, { item: 'Siracha', id: 3 }, { item: 'Ranch', id: 4 }, { item: 'Oregano', id: 5 }];
const drinks = [{ item: 'Gatorade', id: 1 }, { item: 'Pepsi', id: 2 }, { item: 'Montain Dew', id: 3 }, { item: 'Water', id: 4 }, { item: 'Dr. Pepper', id: 5 }, { item: 'Starry', id: 6 }];
// const topItems = [...meatsItems,...veggiesItems];
const topItems =[{item: 'Italian Sausage', id: 1}, {item:'Meatball', id: 2}, {item:'Pepperoni', id: 3}, {item:'Salami', id: 4}, {item:'Smoked Chicken', id: 5},{item: 'Green Peppers', id: 6}, {item:'Black Olives', id: 7}, {item:'Banana Peppers', id: 8}, {item:'Jalapenos', id: 9}, {item:'Mushrooms', id: 10}, {item:'Onions', id: 11}];


const PIZZA_STATE_CHEESE = 0;
const PIZZA_STATE_ONE_TOPPING = 1;
const PIZZA_STATE_TWOFOUR_TOPPING = 2;
const PIZZA_STATE_DRINK = 3;


export default function ToppingTabs(props) {
    const [toppingCount, changeCountTop] = useState(0);
    const [crustCount, changeCountCrust] = useState(0);
    const [drizzleCount, changeCountDrizz] = useState(0);
    const [sauceCount, changeCountSauce] = useState(0);
    const [selectedStateCrust, setSelectedStateCrust] = useState(Array(crustItems.length).fill(false));
    const [selectedStateSauce, setSelectedStateSauce] = useState(Array(sauceItems.length).fill(false));
    // const [selectedStateMeats,setSelectedStateMeats]=useState(Array(meatsItems.length).fill(false));
    // const [selectedStateVeggies,setSelectedStateVeggies]=useState(Array(veggiesItems.length).fill(false));
    const [selectedStateDrizz, setSelectedStateDrizz] = useState(Array(drizzleItems.length).fill(false));
    const [selectedStateTop, setSelectedStateTop] = useState(Array(topItems.length).fill(false));
    const [selectedStateDrinks, setSelectedStateDrinks] = useState(Array(drinks.length).fill(false));

    // const [selectedStateBase, setSelectedStateBase] = useState(Array(baseItems.length).fill(false));
    const [tabIndex, setTabIndex] = useState(0);
    const {
        itemtype_id,
        itemtypes,
        currentorder,
        setorder
    } = props

    const {
        item_display_name,
        item_price,
        min_toppings,
        max_toppings
    } = itemtypes.filter((itemtype)=>itemtype.itemtype_id==itemtype_id)[0]

    function whenClickedTop(index) {
        if (props.pizzaState == PIZZA_STATE_CHEESE || props.pizzaState == PIZZA_STATE_DRINK) {
          null;
        } else if (props.pizzaState == PIZZA_STATE_ONE_TOPPING) {
          if (toppingCount < 1) {
            changeCountTop(toppingCount + 1);
          }
          const newSelectedState = Array(topItems.length).fill(false);;//take into account the past array (copies it in)
          newSelectedState[index] = true;//changes its value to the opposite
          setSelectedStateTop(newSelectedState);
        } else if (props.pizzaState == PIZZA_STATE_TWOFOUR_TOPPING) {
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
 
    
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(crustItems.length).fill(false);//restarts the array with false
        newSelectedState[index] = true;
        setSelectedStateCrust(newSelectedState);
    
      }
      function whenClickedDrizz(index) {

    
    
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(drizzleItems.length).fill(false);
        newSelectedState[index] = true;
        setSelectedStateDrizz(newSelectedState);
      }
      function whenClickedSauce(index) {

    
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(sauceItems.length).fill(false);
        newSelectedState[index] = true;
        setSelectedStateSauce(newSelectedState);
      }
      function whenClickedDrinks(index) {

    
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(drinks.length).fill(false);
        newSelectedState[index] = true;
        setSelectedStateDrinks(newSelectedState);
      }
    
    //   function returnID(newState) {
    //     setPizzaState(newState);
    
    //     const newSelectedState = Array(drizzleItems.length).fill(false);
    //     setSelectedStateDrizz(newSelectedState);
    //     const newSelectedState2 = Array(sauceItems.length).fill(false);
    //     setSelectedStateSauce(newSelectedState2);
    //     const newSelectedState3 = Array(crustItems.length).fill(false);//restarts the array with false
    //     setSelectedStateCrust(newSelectedState3);
    //     const newSelectedState4 = Array(topItems.length).fill(false);//take into account the past array (copies it in)
    //     setSelectedStateTop(newSelectedState4);
    
    //     const newSelectedStateBase = Array(baseItems.length).fill(false);
    //     // <button onClick={() => returnID(baseItem.itemtype_id)} role="button" class="button-nameBase" key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>);
    //     newSelectedStateBase[newState] = true;
    //     setSelectedStateBase(newSelectedStateBase);
    //   }
    function createButton(baseItem, whenClick, buttonClass, selectedState, index) {
        return <div class="card"><button onClick={() => whenClick(index - 1)} class={selectedState[index - 1] ? 'selected2' : buttonClass} key={baseItem.id}> {baseItem.item}</button></div>

    }
    // function createButton(key, text, onClick) {
    //     return <div class="card"><button class="cardContent" key={key} onClick={onClick}> {text}</button></div>
    // }
    // function createButton(baseItem, whenClick, buttonClass, selectedState, index) {
    //     return <div class="card"></div><button onClick={() => whenClick(index - 1)} role="button" class={selectedState[index - 1] ? 'selected' : buttonClass} key={baseItem.itemtype_id}> {baseItem.item_display_name}</button>
    //   }
    const listItemsCrust = crustItems.map(item => createButton(item, whenClickedCrust, "cardContent", selectedStateCrust, item.id));

    const listItemsSauce = sauceItems.map(item => createButton(item, whenClickedSauce, "cardContent", selectedStateSauce, item.itemtype_id));

    const listItemsTop = topItems.map(topItem => createButton(topItem, whenClickedTop, "cardContent", selectedStateTop, topItem.id));


    // const listItemsMeats = meatsItems.map(item => createButton(item, whenClicked, "cardContent", selectedStateSauce, item.id));

    // const listItemsVeggies = veggiesItems.map(item => createButton(item, whenClickedSauce, "cardContent", selectedStateSauce, item.id));

    const listItemsDrizzle = drizzleItems.map(item => createButton(item, whenClickedDrizz, "cardContent", selectedStateDrizz, item.id));

    const listDrinks = drinks.map(item => createButton(item, whenClickedDrinks, "cardContent", selectedStateDrinks, item.id));

    const exit = <div class="exit"><button onClick={() => props.onFormSwitch("customer_view")} type="submit" class="exit_text">Exit</button></div>


    return (
        <div class="background">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Crust</Tab>
                    <Tab>Sauce</Tab>

                    { max_toppings > 0 ? <Tab>Meats & Veggies</Tab> : null }

                    <Tab>Drizzle</Tab>
                    <Tab>Drink</Tab>
                </TabList>

                <TabPanel>
                    {exit}
                    <h2>Choose your Crust</h2>
                    <div class="card__container">
                        {listItemsCrust}
                    </div>
                    <div class="finish_order">
                        <button class="finish_orderText" onClick={()=>{setTabIndex(1)}}>
                            Next
                        </button>
                    </div>
                </TabPanel>
                <TabPanel>
                    {exit}
                    <h2>Choose your Sauce</h2>
                    <div class="card__container">
                        {listItemsSauce}
                    </div>
                    <div class="finish_order">
                        <button class="finish_orderText" onClick={()=>{setTabIndex(2)}}>
                            Next
                        </button>
                    </div>
                </TabPanel>
                { max_toppings > 0 ? <TabPanel>
                    {exit}
                    <h2>Choose your Meats & Veggies</h2>
                    <div class="card__container">
                        {/* {[listItemsMeats,...listItemsVeggies]} */}
                        {listItemsTop}
                    </div>
                    <div class="finish_order">
                        <button class="finish_orderText" onClick={()=>{setTabIndex(3)}}>
                            Next
                        </button>
                    </div>
                </TabPanel> : null }
                
                <TabPanel>
                    {exit} 
                    <h2>Choose your Drizzle</h2>
                    <div class="card__container">
                        {listItemsDrizzle}
                    </div>
                    <div class="finish_order">
                        <button class="finish_orderText" onClick={()=>{setTabIndex(4)}}>
                            Next
                        </button>
                    </div>
                </TabPanel>
                <TabPanel>
                    {exit}
                    <h2>Choose your Drink</h2>
                    <div class="card__container">
                        {listDrinks}
                    </div>
                    <div class="finish_order">
                        <button class="finish_orderText" onClick={() => props.onFormSwitch("checkout_view")}>
                            Finish Order
                        </button>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );

}
