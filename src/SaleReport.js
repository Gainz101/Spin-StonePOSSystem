import {useState} from 'react';
import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import './ManagerView.css'; // Tell webpack that App.js uses these styles

function SalesReport() {
  const [salesReport, setSalesReport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleOkButton() {
    // Do something when the "OK" button is pressed
  }

  function handleGoBack() {
    // Do something when the "X" button is pressed
  }

  const textBox = <p>BLAHBLAHBALH</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h3">Sales Report</Typography>
   
      <div style={{display: 'flex', width: "100%", marginTop: "1rem", marginBottom:"1rem", justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p> {textBox} </p>
        </Paper>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
        <TextField
          label="Start Date"
          variant="outlined"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          variant="outlined"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      
      <div style={{ marginTop: "2rem" }}>
        <Button variant="contained" color="primary" onClick={handleOkButton}>
          OK
        </Button>
      </div>
      
    </div>
  );
}

export default SalesReport;


  