import {useState} from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { blueGrey, red } from '@material-ui/core/colors';
import './ManagerView.css'; // Tell webpack that App.js uses these styles

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
    
    <body style={{background: "#e9dac4", height: "100vh", width: "100%", padding: "20px", }}>
    {exit}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h3">Sales Report</Typography>
   
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          style={{backgroundColor:"white"}}
          label="End Date"
          variant="filled"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      
      <div style={{ marginTop: "2rem" }}>
        <Button variant="contained" color="grey" onClick={handleOkButton}>
          OK
        </Button>
      </div>
      
    </div>
    </body>
  );
}

export default SalesReport;


  