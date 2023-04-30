import React from 'react';
import { Button, TextField, Typography, Grid, Paper} from '@material-ui/core';
import './Inventory.css';

const XZReport = (props) => {
  const OnCurrentXReportButtonPressed = () => {
    // handle current X report button press
  };

  const GoBackToMainWindow = () => {
    // handle back button press
  };

  const OnOKButtonPressed = () => {
    // handle OK button press
  };

  const OnCurrentZReportButtonPressed = () => {
    // handle current Z report button press
  };
  
  // not working exit button
  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>

  return (

    <body class = "background">
    {exit}
    
     <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
      
     <Grid item xs={6}>
 
      <div style={{display: 'block', width: "100%", marginTop: "2rem", marginBottom:"1rem", alignItems: 'left', marginLeft: "50px"}}>
        <Typography variant="h2" align='justify'>X Report</Typography>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto", marginTop:"1%" }} >
          <p style={{padding: '2%'}}> X - Report </p>
        </Paper>
        <button class =  "newitem" onClick={OnCurrentXReportButtonPressed} style={{marginTop: "3%"}}>Current X Report</button>
      </div>
      
      </Grid>

      <Grid item xs={6}>
      <Typography variant="h2" align='justify'>Z Report</Typography>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto", marginTop:"1%"}} >
          <p style={{padding: '2%'}}> Z - Report </p>
        </Paper>
        <button class =  "newitem" onClick={OnCurrentXReportButtonPressed} style={{marginTop: "3%"}}>Current Z Report</button>
        <TextField id="ZDateTextBox" label="Date" placeholder="MM-DD-YYYY" style={{ marginTop: '95px', marginLeft: '18px' }} />
      
      </Grid>
    </Grid>  
    
    </body>
  );
};

export default XZReport;
