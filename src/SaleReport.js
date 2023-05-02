import {useState} from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { blueGrey, red } from '@material-ui/core/colors';
import './ManagerView.css'; 

/**
 *  Returns the Sales Report that
 *  contains 2 textbox for start and end 
 *  dates
 * @param {*} props for form switch
 * @returns Sale Report Window
 */
function SalesReport(props) {
  // Implementation of Backend Sale Report
  const [salesState, updateSalesState] = useState(null);

  //ordersJSON holds all of the JSON with the orders 
  /*
  UseEffect(()=>fetch("http://zeta.ddns.net/order/getRecentOrders")
  .then((res)=>res.json())
  .then((ordersJSON)=>{
    updateSalesState(ordersJSON.map((order)=>{total:order.total}))}),[])
    */
 // return salesState == null ? <h1> loading </h1> : salesState.map((orderInfo)=>(<p>turn sales state into sales data<p>))


  // useStates in order 
  const [salesReport, setSalesReport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleOkButton() {
    // Do something when the "OK" button is pressed
  }

  // not working exit button
  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>
 
  const textBox = <p>Order #1</p>

  return (
    
    <body class = "background">
    {exit}
    <div class = "saleComponents">
    <Typography variant="h2" align='center' style={{marginBottom:"3%", color:"#f7ca28"}}>Sale Report</Typography>
   
      <div class = "salePaperFormat">
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p> {textBox} </p>
        </Paper>
      </div>

      <div class = "saleTextFormat">
        <TextField
          style={{backgroundColor:"white"}}
          label="Start Date"
          variant="filled"
          size="small"
          placeholder='MM-DD-YYYY'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          style={{backgroundColor:"white"}}
          label="End Date"
          variant="filled"
          size="small"
          value={endDate}
          placeholder='MM-DD-YYYY'
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      
        <button class = "yellowbtn" onClick={handleOkButton}>Enter</button>
   
    </div>
    </body>
  );
}

export default SalesReport;


  