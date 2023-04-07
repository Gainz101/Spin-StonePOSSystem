import { useState, useEffect } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import './App.css'; // Tell webpack that App.js uses these styles



// const baseItems = [{item: 'Cheese Pizza', id: 1}, 
//                     {item:'1 Topping Pizza', id: 2}, 
//                     {item:'2-4 Topping Pizza', id: 3},
//                     {item:'Drink', id: 4}
//                   ];



export default function ConsumerView(props) {
  // const [countNum, changeCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [baseItems, setItems] = useState([]);


  // from https://legacy.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch("http://127.0.0.1:5000/baseItems")
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(true);
        setItems(res);
      },
        (error) => {
          setIsLoaded(true);
          console.log("error:", error)
          alert(error);
        })
  }, [])

  // function whenClicked(){
  //   changeCount(countNum+1);
  // }
  return (
    //Parent Element
    <div>
      <div class="background">
        <h2>Choose your Main</h2>
        {
          baseItems.map(item =>
            <div class="card__container">
              <div class="card">
                <button class="cardContent" key={baseItems.id} onClick={() => props.onFormSwitch("toppings_tabs")}>
                  {item.item_display_name}
                </button>
              </div>
            </div>)
        }
      </div>
      <footer class="footer">
        <p>Copyright &copy; 2023 Yezen Hijazin</p>
      </footer>
    </div>
  );
}