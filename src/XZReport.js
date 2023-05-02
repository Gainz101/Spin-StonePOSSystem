import React from 'react';
import { Button, TextField, Typography, Grid, Paper} from '@material-ui/core';
import './ManagerView.css';

const XZReport = (props) => {
  const OnCurrentXReportButtonPressed = () => {
    // handle current X report button press
  };

  const OnOKButtonPressed = () => {
    // handle OK button press
  };

  const OnCurrentZReportButtonPressed = () => {
    // handle current Z report button press
  };
  
  // exit button
  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>

  return (

    <body class = "xzBackground">
    {exit}
     <div style={{marginLeft:"15%"}}>
     <Grid container columnSpacing={{ xs: 1}}>
      
     <Grid item xs={6}>
      
        <Typography variant="h2" align='justify'>X Report</Typography>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto", marginTop:"1%" }} >
          <p class = "xzPaper"> X - Report </p>
        </Paper>
        <button class =  "yellowbtn" onClick={OnCurrentXReportButtonPressed} style={{marginTop: "3%"}}>Current X Report</button>
      
      </Grid>

      <Grid item xs={6}>
      <Typography variant="h2" align='justify'>Z Report</Typography>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto", marginTop:"1%"}} >
          <p class = "xzPaper"> Z - Report </p>
        </Paper>
        <button class =  "yellowbtn" onClick={OnCurrentZReportButtonPressed} style={{marginTop: "3%"}}>Current Z Report</button>
        <TextField
        id="ZDateTextBox" 
        label="Date" 
        placeholder="MM-DD-YYYY" 
        style={{marginTop: "18px", marginLeft: '18px', backgroundColor:"white"}} 
        />
      
      </Grid>
    </Grid>  
    </div>
    </body>
  );
};

export default XZReport;
