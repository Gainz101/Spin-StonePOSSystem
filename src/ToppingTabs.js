import { useState } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles

function createButton(key, text, onClick) {
    return <div class="card"><button class="cardContent" key={key} onClick={onClick}> {text}</button></div>
}
export default function ToppingTabs(props) {
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

    
    const crustItems = [{ item: 'Normal Crust', id: 1 }, { item: 'Cauliflower Crust', id: 2 }];
    const listItemsCrust = crustItems.map(item => createButton(item.id, item.item, ()=>{setTabIndex(1)}));

    const sauceItems = itemtypes.filter((itemtype)=>itemtype.is_sauce)
    const listItemsSauce = sauceItems.map(item => createButton(item.itemtype_id, item.item_display_name, ()=>{setTabIndex(2)}));

    const meatsItems = [{ item: 'Italian Sausage', id: 1 }, { item: 'Meatball', id: 2 }, { item: 'Pepperoni', id: 3 }, { item: 'Salami', id: 4 }, { item: 'Smoked Chicken', id: 5 }];
    const listItemsMeats = meatsItems.map(item => createButton(item.id, item.item, ()=>{setTabIndex(3)}));

    const veggiesItems = [{ item: 'Green Peppers', id: 1 }, { item: 'Black Olives', id: 2 }, { item: 'Banana Peppers', id: 3 }, { item: 'Jalapenos', id: 4 }, { item: 'Mushrooms', id: 5 }, { item: 'Onions', id: 6 }];
    const listItemsVeggies = veggiesItems.map(item => createButton(item.id, item.item, ()=>{setTabIndex(4)}));

    const drizzleItems = [{ item: 'BBQ Sauce', id: 1 }, { item: 'Olive Oil', id: 2 }, { item: 'Siracha', id: 3 }, { item: 'Ranch', id: 4 }, { item: 'Oregano', id: 5 }];
    const listItemsDrizzle = drizzleItems.map(item => createButton(item.id, item.item, ()=>{}));

    const drinks = [{ item: 'Gatorade', id: 1 }, { item: 'Pepsi', id: 2 }, { item: 'Montain Dew', id: 3 }, { item: 'Water', id: 4 }, { item: 'Dr. Pepper', id: 5 }, { item: 'Starry', id: 6 }];
    const listDrinks = drinks.map(item => createButton(item.id, item.item, ()=>{}));

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
                        <button class="finish_orderText" onClick={() => props.onFormSwitch("checkout_view")}>
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
                        <button class="finish_orderText" onClick={() => props.onFormSwitch("checkout_view")}>
                            Next
                        </button>
                    </div>
                </TabPanel>
                { max_toppings > 0 ? <TabPanel>
                    {exit}
                    <h2>Choose your Meats & Veggies</h2>
                    <div class="card__container">
                        {[listItemsMeats,...listItemsVeggies]}
                    </div>
                    <div class="finish_order">
                        <button class="finish_orderText" onClick={() => props.onFormSwitch("checkout_view")}>
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
                        <button class="finish_orderText" onClick={() => props.onFormSwitch("checkout_view")}>
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
