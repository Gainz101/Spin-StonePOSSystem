import { useState } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles
import { BACKEND_IP } from './BackendConnection';

// Sort of array with all the current listed Items

/* Note: Normal crust isn't a real item */
const crustItems = [{ item_display_name: 'Normal Crust', itemtype_id: -1 }, { "itemtype_id": 33, "item_display_name": "Cauliflower Crust", "item_price": 2.99, "is_modifier": true, "is_pizza": false, "min_toppings": 0, "max_toppings": 0, "is_topping": false, "is_drizzle": false, "is_drink": false, "is_sauce": false, "is_crust": true }];


const PIZZA_STATE_CHEESE = 0;
const PIZZA_STATE_ONE_TOPPING = 1;
const PIZZA_STATE_TWOFOUR_TOPPING = 2;
const PIZZA_STATE_DRINK = 3;

/**
 * 
 * @param {*} props 
 * @returns 
 */
export default function ToppingTabs(props) {
    const sauceItems = props.itemtypes.filter((item) => item.is_sauce)
    const drizzleItems = props.itemtypes.filter((item) => item.is_drizzle)
    const topItems = props.itemtypes.filter((item) => item.is_topping)
    const drinkItems = props.itemtypes.filter((item) => item.is_drink)
    
    const order_id = props.currentOrder.order_id

    const [toppingCount, changeCountTop] = useState(0);
    const [selectedStateCrust, setSelectedStateCrust] = useState(Array(crustItems.length).fill(false));
    const [selectedStateSauce, setSelectedStateSauce] = useState(Array(sauceItems.length).fill(false));
    const [selectedStateDrizz, setSelectedStateDrizz] = useState(Array(drizzleItems.length).fill(false));
    const [selectedStateTop, setSelectedStateTop] = useState(Array(topItems.length).fill(false));
    const [selectedStateDrinks, setSelectedStateDrinks] = useState(Array(drinkItems.length).fill(false));
    const [tabIndex, setTabIndex] = useState(0);

    const [blockCheckout, setBlockCheckout] = useState(false)

    const {
        min_toppings,
        max_toppings
    } = props.itemtypes.filter((itemtype) => itemtype.itemtype_id == props.pizzaState)[0]

    /**
     * 
     * @param {*} index 
     * @returns Shows how many toppings have been selected
     */
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

    /**
     * 
     * @param {*} index
     * @returns this will set the selected state of the clicked button to true for crusts
     */
    function whenClickedCrust(index) {
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(crustItems.length).fill(false);//restarts the array with false
        newSelectedState[index] = true;
        setSelectedStateCrust(newSelectedState);
    }

    /**
     * 
     * @param {*} index 
     * @returns this will set the selected state of the clicked button to true for drizzle
     */
    function whenClickedDrizz(index) {
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(drizzleItems.length).fill(false);
        newSelectedState[index] = true;
        setSelectedStateDrizz(newSelectedState);
    }

    /**
     * @param {*} index
     * @returns this will set the selected state of the clicked button to true for sauce
     */
    function whenClickedSauce(index) {
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(sauceItems.length).fill(false);
        newSelectedState[index] = true;
        setSelectedStateSauce(newSelectedState);
    }

    /**
     * 
     * @param {*} index
     * @returns this will set the selected state of the clicked button to true for drinks 
     */
    function whenClickedDrinks(index) {
        // Set the selected state of the clicked button to true
        const newSelectedState = Array(drinkItems.length).fill(false);
        newSelectedState[index] = true;
        setSelectedStateDrinks(newSelectedState);
    }

    /**
     * 
     * @param {*} item 
     * @param {*} whenClick 
     * @param {*} buttonClass 
     * @param {*} selectedState 
     * @param {*} itemtype_id 
     * @returns a button that can be clicked
     */
    function createButton(item, whenClick, buttonClass, selectedState, itemtype_id) {
        return <div class="card">
            <button onClick={() => whenClick(itemtype_id - 1)} class={selectedState[itemtype_id - 1] ? 'selected2' : buttonClass} key={item.itemtype_id}>
                {item.item_display_name}
            </button>
        </div>
    }

    const listItemsCrust = crustItems.map(item => createButton(item, whenClickedCrust, "cardContent", selectedStateCrust, item.itemtype_id));
    const listItemsSauce = sauceItems.map(item => createButton(item, whenClickedSauce, "cardContent", selectedStateSauce, item.itemtype_id));
    const listItemsTop = topItems.map(item => createButton(item, whenClickedTop, "cardContent", selectedStateTop, item.itemtype_id));
    const listItemsDrizzle = drizzleItems.map(item => createButton(item, whenClickedDrizz, "cardContent", selectedStateDrizz, item.itemtype_id));
    const listDrinks = drinkItems.map(item => createButton(item, whenClickedDrinks, "cardContent", selectedStateDrinks, item.itemtype_id));

    const exit = <div class="exitApp"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_textApp">Exit</button></div>

    /**
     * 
     * @param {*} finishCallback 
     * @returns adds pizza to the checkout order of the selected buttons
     */
    function AddPizzaToOrder(finishCallback) {
        const PizzaId = props.pizzaState
        const PizzaModifiers = [listItemsCrust, listItemsDrizzle, listItemsSauce, listItemsTop]
            .flat()
            .filter((reactObject) => {
                console.log(reactObject)
                return reactObject.props.children.props.class == 'selected2'
            })
            .map((reactObject) => parseInt(reactObject.props.children.key))
            .filter((itemTypeId) => itemTypeId > 0) // Exclude normal crust (-1)


        const DrinkId = listDrinks.filter((reactObject) => reactObject.props.children.props.class == 'selected2')
            .map((reactObject) => parseInt(reactObject.props.children.key))[0]

        console.log(PizzaId, PizzaModifiers)
        console.log(DrinkId)

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
                .then((new_order_state2) => {
                    fetch(`${BACKEND_IP}/order/addItem?order_id=${order_id}&itemtype_ids=${DrinkId}`)
                        .then((res) => res.json())
                        .then((responseJSON) => {
                            // Refresh the component with the new order items by setting the order state
                            props.setCurrentOrder(responseJSON.entire_order)

                            finishCallback() // Change to checkout view
                        })
                })


        })
    }

    return (
        <div class="background">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Crust</Tab>
                    <Tab>Sauce</Tab>

                    {max_toppings > 0 ? <Tab>Meats & Veggies</Tab> : null}

                    <Tab>Drizzle</Tab>
                    <Tab>Drink</Tab>
                </TabList>

                <TabPanel>
                    {exit}
                    <h2>Choose your Crust</h2>
                    <div class="card__container2">
                        {listItemsCrust}
                    </div>
                    <div class="next_tab">
                        <button class="next_tabText" onClick={() => { setTabIndex(1) }}>
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
                    <div class="next_tab">
                        <button class="next_tabText" onClick={() => { setTabIndex(2) }}>
                            Next
                        </button>
                    </div>
                </TabPanel>
                {max_toppings > 0 ? <TabPanel>
                    {exit}
                    <h2>Choose your Meats & Veggies</h2>
                    <div class="card__container">
                        {/* {[listItemsMeats,...listItemsVeggies]} */}
                        {listItemsTop}
                    </div>
                    <div class="next_tab">
                        <button class="next_tabText" onClick={() => { setTabIndex(3) }}>
                            Next
                        </button>
                    </div>
                </TabPanel> : null}

                <TabPanel>
                    {exit}
                    <h2>Choose your Drizzle</h2>
                    <div class="card__container">
                        {listItemsDrizzle}
                    </div>
                    <div class="next_tab">
                        <button class="next_tabText" onClick={() => { setTabIndex(max_toppings > 0 ? 4 : 3) }}>
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
                    <div class="next_tab">
                        <button class="next_tabText" onClick={() => {
                            setBlockCheckout(true)
                            if(!blockCheckout)
                            AddPizzaToOrder(()=>{props.onFormSwitch("checkout_view"); setBlockCheckout(false)})

                        }}>
                            Finish Order
                        </button>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );

}
