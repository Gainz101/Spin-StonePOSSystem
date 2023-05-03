
import { useState, useEffect } from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import './ManagerView.css'; // Tell webpack that App.js uses these style
import { BACKEND_IP } from './BackendConnection';

/**
 * Order History View for last ten orders 
 * in Text format 
 * @param {*} props for form switch
 * @returns View of Order History (last 10)
 */
function OrderHistory(props) {


  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //doesnt save text fields
    setOpen(false);
  };

  const handleOkClose = () => {
    //saves text field
    setOpen(false);
  };
  const [orderState, setOrderState] = useState(null);

  /**
   * @returns returns the orders to our order history text box
   */
  function loadOrders() {
    fetch(`${BACKEND_IP}/order/getRecentOrders`).then((res) => res.json()).then((orderState) => {
      setOrderState(orderState)
    }, alert)
  }
  useEffect(() => {
    loadOrders()
  }, [])

  /**
   * 
   * @param {*} order 
   * @returns Changes our order into text that we can display
   */
  function convertOrderToText(order) {
    const { items } = order;
    console.log(order); 
    const jsonedit = JSON.stringify(order);
    //const jsonreturn = JSON.parse(order);
    const noitem= "No Items"
    
    
    return <p>Order #{order.order_id}: {JSON.stringify(order.creation_time).substring(13,20)} CST {JSON.stringify(order.creation_time).substring(1,11)}: {order.items.map(item=>item.item_display_name).join(' + ') == "" ? noitem : 
    order.items.map(item=>item.item_display_name).join(' + ')}  </p> 
  }
  /**
   * Implemented Text for the last 10 Orders
   */
  const textBox = <p> {
      orderState == null ? <h1> Loading... </h1> : orderState.map(convertOrderToText)   }
    </p>

  return (
    
    <body class = "background">
    {exit}
    <div class = "orderHistoryDiv">
      <Typography variant="h2">Order History</Typography>
      {/* {salesState == null ? <h1> loading </h1> : orderStatae.map((orderInfo)=>())} */}
      
      
      <div class = "orderPaperFormat">
        <Paper elevation={1} style={{width: 1200, height: 800, overflow: "auto" }} >
          <p> {textBox} </p>
        </Paper>
      </div>
      <div class = "orderBTN">

      </div>

    </div>
    </body>
  );
}

export default OrderHistory;


  