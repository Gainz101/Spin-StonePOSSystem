import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, Paper} from '@material-ui/core';
import './ManagerView.css';


/**
 * The X Table contains all the past orders of the day
 * The Z Table contains 
 * @param {*} props for form switch
 * @returns Returns the XZ Report Table 
 */
const XZReport = (props) => {

  const [Zstate, setZstate] = useState(null);
  const [Xstate, setXstate] = useState(null);


  function getRecentZ(){
    return new Promise((resolve,fail)=>fetch(`http://zeta.ddns.net/showRecentZ`).then((res) => res.json()).then((recentZ) => {
      resolve(recentZ.map((zItem)=>{
        const {itemtype_id, item_display_name, quantity_sold, amount_sold_dollars} = zItem;

    

        return [<p>
          <span></span>
        <b>{item_display_name}</b><br/>
        <b>&nbsp;&nbsp;&nbsp;Quantity Sold: {quantity_sold}</b><br/>
        <b>&nbsp;&nbsp;&nbsp;Amount Sold: ${amount_sold_dollars.toFixed(2)}</b>
        
        </p>]
      }).flat())
    }, fail))
  }

  useEffect(() => {
  
  }, [])

  const OnCurrentXReportButtonPressed = () => {
    getRecentZ().then((recentZ)=>setXstate(recentZ))
    // handle current X report button press
  };

  const OnOKButtonPressed = () => {
    getRecentZ().then((recentZ)=>setXstate(recentZ)).then(()=>{
      fetch(`http://zeta.ddns.net/updateLastZ`).then((res)=>res.json(), alert)
    })
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
          {Xstate}
        </Paper>
        <button class =  "yellowbtn" onClick={OnCurrentXReportButtonPressed} style={{marginTop: "3%"}}>Current X Report</button>
      
      </Grid>

      <Grid item xs={6}>
      <Typography variant="h2" align='justify'>Z Report</Typography>
        <Paper elevation={1} style={{width: 400, height: 400, overflow: "auto", marginTop:"1%"}} >
          {Zstate}
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
