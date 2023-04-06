import {useState} from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import './App.css'; // Tell webpack that App.js uses these styles
import ToppingTabs from './ToppingTabs';



const baseItems = [{item: 'Cheese Pizza', id: 1}, {item:'1 Topping Pizza', id: 2}, {item:'2-4 Topping Pizza', id: 3}, {item:'Drink', id: 4}];
 

  
  export default function ConsumerView(props) {
    // const [countNum, changeCount] = useState(0);

    // function whenClicked(){
    //   changeCount(countNum+1);
    // }
    const listItems = baseItems.map(baseItems => <div class="card__container"><div class = "card"><button class="cardContent" key={baseItems.id} onClick={() => props.onFormSwitch("toppings_tabs")}> {baseItems.item}</button></div></div>);
    return (
      //Parent Element
      <div>
        <div class="background">
          <h2>Choose your Main</h2>
          {listItems}
        </div>
        <footer class="footer">
          <p>Copyright &copy; 2023 Yezen Hijazin</p>
        </footer>
      </div>
    );
  }