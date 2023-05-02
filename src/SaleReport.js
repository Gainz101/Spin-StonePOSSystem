import {useState, useEffect} from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { blueGrey, red } from '@material-ui/core/colors';
import './ManagerView.css'; 
import { BACKEND_IP } from './BackendConnection';

/**
 *  Returns the Sales Report that
 *  contains 2 textbox for start and end 
 *  dates
 * @param {*} props for form switch
 * @returns Sale Report Window
 */
function SalesReport(props) {
  
  //ordersJSON holds all of the JSON with the orders 
  
  // Implementation of Backend Sale Report
  const [salesState, updateSalesState] = useState(null);

  function loadSale(){
    fetch(`http://zeta.ddns.net/salesReport?startDate=4/22/2023&endDate=5/2/2023`).then((res) => res.json()).then((salesState) => {
      updateSalesState(salesState)
    }, alert)
  }

  useEffect(() => {
    loadSale()
  }, [])

  // useStates in order 
  const [salesReport, setSalesReport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleOkButton() {
    // Do something when the "OK" button is pressed
    
  }

  // not working exit button
  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>
 
  function convertSaleText(sales) {
      const {items} = sales;
      console.log(sales);
      const jsonEdit = JSON.stringify(sales);
      return <p>
        {sales.item_display_name}'s total amount is {sales.amount_sold_dollars.toFixed(2)}   
        </p>
  }

  const textBox = <p>{
    salesState == null ? <h1>Loading.....</h1> : salesState.map(convertSaleText)
    }
  </p>


  return (
    
    <body class = "background">
    {exit}
    <div class = "saleComponents">
    <Typography variant="h2" align='center' style={{marginBottom:"3%", color:"#f7ca28"}}>Sale Report</Typography>
    
      <div class = "salePaperFormat">
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          {textBox}
        </Paper>
      </div>

      <div class = "saleTextFormat">
        <TextField
          style={{backgroundColor:"white"}}
          label="Start Date"
          variant="filled"
          size="small"
          placeholder='MM/DD/YYYY'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          style={{backgroundColor:"white"}}
          label="End Date"
          variant="filled"
          size="small"
          value={endDate}
          placeholder='MM/DD/YYYY'
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button class = "yellowbtn" onClick={handleOkButton}>Enter</button>
      
    </div>
    
    </body>
  );
}

export default SalesReport;


  