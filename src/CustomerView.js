import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles






export default function CustomerView(props) {
  // const [countNum, changeCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [baseItems, setItems] = useState([]);
  // const baseItems = [{item_display_name: 'Cheese Pizza', itemtype_id: 1},
  //                   {item_display_name:'1 Topping Pizza', itemtype_id: 2},
  //                   {item_display_name:'2-4 Topping Pizza', itemtype_id: 3},
  //                   {item_display_name:'D', itemtype_id: 4}];

  //from https://legacy.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch("http://127.0.0.1:5001/baseItems")
      .then((res)=>res.json())
      .then((jsonItems) => {
        setIsLoaded(true);
        setItems(jsonItems);
      },
        (error) => {
          setIsLoaded(false);
          console.log("error:", error)
          alert(error);
        })
  }, [])




  return (
    //Parent Element
    <div>
      <div class="background">
        <h2>Choose your Main</h2>
        {isLoaded ? 
          baseItems.map(item => 
            <div class="card__container">
              <div class = "card">
                <button class="cardContent" key={item.itemtype_id} onClick={() => props.onFormSwitch("toppings_tabs")}> 
                  {item.item_display_name}
                </button>
              </div>
            </div>)
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