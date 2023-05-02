import {useState} from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { blueGrey, red } from '@material-ui/core/colors';
import './ManagerView.css'; 

function SalesReport(props) {
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
    <Typography variant="h2" align='center' style={{marginBottom:"3%", color:"#f7ca28"}}>Sale Report</Typography>
   
      <div style={{display: 'flex', width: "100%", marginTop: "1rem", marginBottom:"1rem", justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p> {textBox} </p>
        </Paper>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
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
   
        <button class =  "newitem" onClick={handleOkButton}>Enter</button>
   
      
    </div>
    </body>
  );
}

export default SalesReport;


  