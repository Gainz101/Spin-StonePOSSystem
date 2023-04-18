import { useState } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles


export default function ToppingTabs(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const crustItems = [{ item: 'Normal Crust', id: 1 }, { item: 'Cauliflower Crust', id: 2 }];
    const listItemsCrust = crustItems.map(baseItems => <div class="card__container"><div class="card"><button class="cardContent" key={baseItems.id}> {baseItems.item}</button></div></div>);

    const sauceItems = [{ item: 'Alfredo', id: 1 }, { item: 'Traditional Red', id: 2 }, { item: 'Zesty Red', id: 3 }];
    const listItemsSauce = sauceItems.map(baseItems => <div class="card__container"><div class="card"><button class="cardContent" key={baseItems.id}> {baseItems.item}</button></div></div>);

    const meatsItems = [{ item: 'Italian Sausage', id: 1 }, { item: 'Meatball', id: 2 }, { item: 'Pepperoni', id: 3 }, { item: 'Salami', id: 4 }, { item: 'Smoked Chicken', id: 5 }];
    const listItemsMeats = meatsItems.map(baseItems => <div class="card__container"><div class="card"><button class="cardContent" key={baseItems.id}> {baseItems.item}</button></div></div>);

    const veggiesItems = [{ item: 'Green Peppers', id: 1 }, { item: 'Black Olives', id: 2 }, { item: 'Banana Peppers', id: 3 }, { item: 'Jalapenos', id: 4 }, { item: 'Mushrooms', id: 5 }, { item: 'Onions', id: 6 }];
    const listItemsVeggies = veggiesItems.map(baseItems => <div class="card__container"><div class="card"><button class="cardContent" key={baseItems.id}> {baseItems.item}</button></div></div>);

    const drizzleItems = [{ item: 'BBQ Sauce', id: 1 }, { item: 'Olive Oil', id: 2 }, { item: 'Siracha', id: 3 }, { item: 'Ranch', id: 4 }, { item: 'Oregano', id: 5 }];
    const listItemsDrizzle = drizzleItems.map(baseItems => <div class="card__container"><div class="card"><button class="cardContent" key={baseItems.id}> {baseItems.item}</button></div></div>);

    const exit = <div class="exit"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_text">Exit</button></div>


    return (
        <div class="background">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Crust</Tab>
                    <Tab>Sauce</Tab>
                    <Tab>Meats</Tab>
                    <Tab>Veggies</Tab>
                    <Tab>Drizzle</Tab>
                </TabList>

                <TabPanel>
                    {exit}
                    <h2>Choose your Crust</h2>
                    {listItemsCrust}
                </TabPanel>
                <TabPanel>
                    {exit}
                    <h2>Choose your Sauce</h2>
                    {listItemsSauce}
                </TabPanel>
                <TabPanel>
                    {exit}
                    <h2>Choose your Meats</h2>
                    {listItemsMeats}
                </TabPanel>
                <TabPanel>
                    {exit}
                    <h2>Choose your Veggies</h2>
                    {listItemsVeggies}
                </TabPanel>
                <TabPanel>
                    {exit}
                    <h2>Choose your Drizzle</h2>
                    {listItemsDrizzle}
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
