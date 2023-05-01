import {useState} from 'react';
import React from "react";
import './ManagerView.css'; // Tell webpack that App.js uses these styles
import {Button} from "@material-ui/core";
import SalesView from './SaleReport';
import XZReport from './XZReport';
import Inventory from './Inventory';
import OrderHistory from './OrderHistory';



const baseItems = [{item: 'Sales Report', id: 1}, {item:'X-Z Report', id: 2}, {item:'Inventory', id: 3}, {item:'Order History', id: 4}];


  /**
   * Manager Select View to click through 
   * The 4 different Views
   * @param {*} props 
   * @returns React/JS View for the Manager Select
   */
  export default function ManagerSelect(props) {
    const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_text">Exit</button></div>
    
    /**
     * 
     * @param {*} itemId 
     * @returns  itemId that corresponds to the correct
     *           form switch name 
     */
    const handleItemClick = (itemId) => {
      if(itemId == 1){
        return "sales_view";
      }
      else if(itemId == 2){ 
        return "xz_view";
      }
      else if(itemId == 3){ 
        return "inventory_view";
      }
      else{ // 4
        return "order_view";
      }
    };
   
    //Mapping of buttons
    const listItems = baseItems.map(baseItems => 
      <div class="card__containerMan">
        <div class = "cardMan">
            <button class="cardContentMan" key={baseItems.id} onClick={() => props.onFormSwitch(handleItemClick(baseItems.id))}> 
                {baseItems.item}
            </button>
        </div>
    </div>
    );

    return (
      //Parent Element
      <div>
        <div class="background">
        {exit}
          <h2>Manager Select</h2>
          {listItems}
        </div>
      </div>
    );
  }

  