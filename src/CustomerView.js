import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles
import { BACKEND_IP } from "./BackendConnection";
import ToppingTabs from "./ToppingTabs";
import oneTop from "./assets/1top.jpg"
import cheese from "./assets/cheese.jpg"
import CheckOut from './CheckOut'







export default function CustomerView(props) {
  const [pizzaState, setPizzaState] = useState(0);
  // const [countNum, changeCount] = useState(0);
  const [isBaseItemsLoaded, setIsOrderLoaded] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [itemTypes, setItemTypes] = useState(null);

  const [baseItems, setBaseItems] = useState([]);

  const [itemType, setItemType] = useState(null);

  const [currentForm, setCurrentForm] = useState("topping_tabs")
  

  //from https://legacy.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch(BACKEND_IP + "/baseItems")
      .then((res) => res.json())
      .then((jsonItems) => {
        console.log(jsonItems)
        setIsOrderLoaded(true);
        setBaseItems(jsonItems);
      },
        (error) => {
          setIsOrderLoaded(false);
          console.log("error:", error)
          alert(error);
        })
  }, [])

  function setNewOrder() {
    return fetch(BACKEND_IP + "/order/new")
    .then((res) => res.json())
    .then((jsonItems) => {
      console.log(jsonItems)

      setCurrentOrder(jsonItems)
    },
      (error) => {
        console.log("error:", error)
        alert(error);
      })

  }
  useEffect(() => {
    setNewOrder()
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

  function returnID(newState) {
    setPizzaState(newState);
    setCurrentForm("topping_tabs")
  }





  return (
    //Parent Element
    <div>
      <div>
        {/* <div class="buttonSelection"> */}
        {((isBaseItemsLoaded) && (currentOrder !== null) && (itemTypes !== null)) ?
          (itemType == null ?
            <div class="background">               
              <h2>Choose your Main</h2>
              <div class="card__container">
                {baseItems.map(item => 
                    <div class = "card"> 
                      <button class="cardContent" key={item.itemtype_id} onClick={()=>{setItemType(item.itemtype_id);returnID(item.itemtype_id)}}> 
                        {item.item_display_name}
                        {/* <img class="itemPic" src={cheese}/> */}
                      </button>
                    </div>
                  )} 
              </div>
            </div> :
              ( currentForm === "topping_tabs" ? 
                  <ToppingTabs itemtype_id={itemType} itemtypes={itemTypes} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} onFormSwitch={setCurrentForm} pizzaState={pizzaState}></ToppingTabs> :
              currentForm === "checkout_view" ? <CheckOut onFormSwitch={setCurrentForm} setItemType={setItemType} setCurrentOrder={setCurrentOrder} currentOrder={currentOrder} setNewOrder={setNewOrder}/> : null )
              )
            :
            (<h1>
              Loading...
            </h1>)}
          </div>
          {/* <div class="orderLog2">
            <div class="box3"></div>
          </div> */}
      {/* </div> */}
      <footer class="footer">
        <p>Copyright &copy; 2023 Yezen Hijazin</p>
      </footer>
    </div>
  );
}