import {useState} from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import './ManagerView.css'; // Tell webpack that App.js uses these style

/**
 * Order History View for last ten orders 
 * in Text format 
 */
function OrderHistory(props) {


  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>

  /**
   * Implemented Text for the last 10 Orders
   */
  const textBox = <p> Order #1 </p>

  return (
    
    <body class = "background">
    {exit}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h2">Order History</Typography>
   
      <div style={{display: 'flex', width: "100%", marginTop: "1rem", marginBottom:"1rem", justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p> {textBox} </p>
        </Paper>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "30%" }}>
      <button class = "yellowbtn">Back</button>
      <button class = "yellowbtn">Next</button>
      </div>

    </div>
    </body>
  );
}

export default OrderHistory;


  