import {useState} from 'react';
import * as React from 'react';
import { TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Grid } from "@material-ui/core";
import './ManagerView.css'; // Tell webpack that App.js uses these styles

// Will later connect to back end to have the inventory items in the table
function createMenuData(menuItem, menuPrice, id, isModifier) {
    return { menuItem, menuPrice, id, isModifier};
  }
  //INPUTS Test for Menu Table
  const menuRows = [
    createMenuData('1 Topping Pizza', 6.25, 'OT',false),
    createMenuData('Cheese Pizza', 6.25, 'CZ', false),
    createMenuData('Cauliflower Crust', 2.25, 'CC', true),
    createMenuData('Spinach', 0.0, 'SP', true)
    
  ];

// Stock items in the table
function createStockData(stockId, stockName, quantity, minAmount, units) {
    return { stockId, stockName, quantity, minAmount, units };
  }
  //INPUTS Test for Menu Table
  const stockRows = [
    createStockData('WA', 'Water', 15, 0, "lbs"),
    createStockData('MB', 'Meatball', 4, 0, "lbs"),
    createStockData('SP', "Spinach", 10, 0, "lbs")
  ];  

function Inventory(props) {

  // not working exit button
  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>
 


  return (
    //&nbsp; is a character entity that denotes a non-breaking or fixed space
    <body style={{background: "#e9dac4", height: "100vh", width: "98%", padding: "20px", }}>
    {exit}
    <Typography variant="h2" align='center' style={{marginBottom:"3%", color:"#8458B3"}}>Inventory</Typography>
    
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
    
    {/*Menu Items*/}
    <Grid item xs={6}>
    <TableContainer component={Paper} style={{margin: '10px', width:700}}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{backgroundColor:"#8458B3", fontFamily: 'monospace'}}>
          <TableRow>
            <TableCell>Menu Item</TableCell>
            <TableCell align="right">Price&nbsp;($)</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">isModifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menuRows.map((menuRows) => (
            <TableRow
              key={menuRows.menuItem}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {menuRows.menuItem}
              </TableCell>
              <TableCell align="right">{menuRows.menuPrice}</TableCell>
              <TableCell align="right">{menuRows.id}</TableCell>
              <TableCell align="right">{String(menuRows.isModifier)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>

    {/*Stock Table*/}
    <Grid item xs={6}>
    <TableContainer component={Paper} style={{margin: '10px', width:700}}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{backgroundColor:"#8458B3", fontFamily: 'monospace'}}>
          <TableRow>
            <TableCell>Stock ID</TableCell>
            <TableCell align="right">Stock Name</TableCell>
            <TableCell align="right">Quantity&nbsp;</TableCell>
            <TableCell align="right">Minimum Amount</TableCell>
            <TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockRows.map((stockRows) => (
            <TableRow
              key={stockRows.menuItem}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {stockRows.stockId}
              </TableCell>
              <TableCell align="right">{stockRows.stockName}</TableCell>
              <TableCell align="right">{stockRows.quantity}</TableCell>
              <TableCell align="right">{stockRows.minAmount}</TableCell>
              <TableCell align="right">{stockRows.units}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>


    </Grid>
    </body>
  );
}
export default Inventory;




  