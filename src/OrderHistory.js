
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

  function loadOrders() {
    fetch(`${BACKEND_IP}/order/getRecentOrders`).then((res) => res.json()).then((orderState) => {
      setOrderState(orderState)
    }, alert)
  }
  useEffect(() => {
    loadOrders()
  }, [])
  function convertOrderToText(order) {
    const { items } = order;
    console.log(order); 
    return <p>{JSON.stringify(order)}</p>
  }
  /**
   * Implemented Text for the last 10 Orders
   */
  const textBox = <p> {
      orderState == null ? <h1> loading </h1> : orderState.map(convertOrderToText)   }
    </p>

  return (
    
    <body class = "background">
    {exit}
    <div class = "orderHistoryDiv">
      <Typography variant="h2">Order History</Typography>
      {/* {salesState == null ? <h1> loading </h1> : orderStatae.map((orderInfo)=>())} */}
      
      
      <div class = "orderPaperFormat">
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p> {textBox} </p>
        </Paper>
      </div>
      <div class = "orderBTN">
      <button class = "yellowbtn">Back</button>
      <button class = "yellowbtn">Next</button>
      </div>

    </div>
    </body>
  );
}

export default OrderHistory;


  