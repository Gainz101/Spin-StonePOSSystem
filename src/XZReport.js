import React from 'react';
import { Button, TextField, Typography, Grid, Paper} from '@material-ui/core';

const XZReport = () => {
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

  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("login")} type="submit" class="exit_text">Exit</button></div>

  return (

    <body style={{background: "#e9dac4", height: "100vh", width: "100%", padding: "20px", }}>
    {exit}
    
     <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
      
     <Grid item xs={6}>
 
      <Typography variant="h2" align='justify'>X Report</Typography>
      <div style={{display: 'block', width: "100%", marginTop: "2rem", marginBottom:"1rem", alignItems: 'left'}}>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p style={{padding: '2%'}}> X - Report </p>
        </Paper>
        <Button onClick={OnCurrentXReportButtonPressed} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Current X Report
        </Button>
      </div>
      </Grid>

      <Grid item xs={6}>
      <Typography variant="h2" align='justify'>Z Report</Typography>
        <div style={{display: 'block', width: "100%", marginTop: "2rem", marginBottom:"1rem", justifyContent: 'center', alignItems: 'center'}}>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto" }} >
          <p style={{padding: '2%'}}> Z - Report </p>
        </Paper>
        <Button onClick={OnCurrentZReportButtonPressed} variant="contained" color="primary" style={{ marginTop: '64px' }}>
          Current Z Report
        </Button>
        <TextField id="ZDateTextBox" label="Date" placeholder="MM-DD-YYYY" style={{ marginTop: '95px', marginLeft: '18px' }} />
        </div>
      </Grid>

    </Grid>  
    </body>
  );
};

export default XZReport;

/*
 <body style={{background: "#e9dac4", height: "100vh", width: "100%", padding: "20px", }}>
    {exit}
    
     <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
      
     <Grid item xs={6}>
      <Typography variant="h2">X Report</Typography>
      <textarea id="X_Report_TXT_BOX" style={{ width: '376px', height: '588px', fontFamily: 'monospace' }} />
      <Button onClick={OnCurrentXReportButtonPressed} variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Current X Report
      </Button>
      </Grid>

      <Grid item xs={6}>
      <Typography variant="h2" style={{ marginTop: '64px' }}>Z Report</Typography>
      <textarea id="Z_Report_TXT_BOX" style={{ width: '376px', height: '588px', fontFamily: 'monospace', marginLeft: '64px' }} />
      <TextField id="ZDateTextBox" label="Date" placeholder="MM-DD-YYYY" style={{ marginTop: '32px', marginRight: '16px' }} />
      <Button onClick={OnCurrentZReportButtonPressed} variant="contained" color="primary" style={{ marginTop: '64px' }}>
        Current Z Report
      </Button>
      </Grid>

    </Grid>  
    </body>
*/