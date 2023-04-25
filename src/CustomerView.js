import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles
import { BACKEND_IP } from "./BackendConnection";
import ToppingTabs from "./ToppingTabs";






export default function CustomerView(props) {
  // const [countNum, changeCount] = useState(0);
  const [isBaseItemsLoaded, setIsOrderLoaded] = useState(false);
  const [currentOrder, setOrder] = useState(null);
  const [itemTypes, setItemTypes] = useState(null);

  const [baseItems, setItems] = useState([]);

  const [itemType, setItemType] = useState(null);

  //   const baseItems = [{item: 'Cheese Pizza', id: 1},
  //   {item:'1 Topping Pizza', id: 2},
  //   {item:'2-4 Topping Pizza', id: 3},
  //   {item:'Drink', id: 4}];
  // const listItems = baseItems.map(baseItems => <div class="card__container"><div class = "card"><button class="cardContent" key={baseItems.id} onClick={() => props.onFormSwitch("toppings_tabs")}> {baseItems.item}</button></div></div>);

  //from https://legacy.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch(BACKEND_IP + "/baseItems")
      .then((res) => res.json())
      .then((jsonItems) => {
        console.log(jsonItems)
        setIsOrderLoaded(true);
        setItems(jsonItems);
      },
        (error) => {
          setIsOrderLoaded(false);
          console.log("error:", error)
          alert(error);
        })
  }, [])

  useEffect(() => {
    fetch(BACKEND_IP + "/order/new")
      .then((res) => res.json())
      .then((jsonItems) => {
        console.log(jsonItems)

        setOrder(jsonItems)
      },
        (error) => {
          console.log("error:", error)
          alert(error);
        })
  }, [])

  useEffect(() => {
    fetch(BACKEND_IP + "/itemTypes")
      .then((res) => res.json())
      .then((jsonItems) => {
        console.log(jsonItems)

        setItemTypes(jsonItems)
      },
        (error) => {
          console.log("error:", error)
          alert(error);
        })
  }, [])





  return (
    //Parent Element
    <div>
      <div class="background10">

        {((isBaseItemsLoaded) && (currentOrder !== null) && (itemTypes !== null)) ?
          (itemType == null ?
            <div>               <h2>Choose your Main</h2>
            {
              baseItems.map(item => 
            <div class="card__container">
              <div class = "card">
                <button class="cardContent" key={item.itemtype_id} onClick={()=>setItemType(item.itemtype_id)}> 
                  {item.item_display_name}
                </button>
              </div>
            </div>)} </div> :
            <ToppingTabs itemtype_id={itemType} itemtypes={itemTypes} currentorder={currentOrder} setorder={setOrder} onFormSwitch={props.onFormSwitch}></ToppingTabs>)
          :
          (<h1>
            Loading...
          </h1>)}
      </div>
      <footer class="footer">
        <p>Copyright &copy; 2023 Yezen Hijazin</p>
      </footer>
    </div>
  );
}