import {useState} from 'react';
import * as React from 'react';
import { TextField, Button, 
        Typography, Paper, 
        Table, TableBody, 
        TableCell, TableHead, 
        TableRow, TableContainer, Grid
      } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';


  
import './Inventory.css';



function Inventory(props) {
  /// useState for Stock 
  const [stockRowIndex, stockSetRowIndex] = useState(-1);
  const [stockColumnIndex, stockSetColumnIndex] = useState(-1);
  const [stockRows, stockSetRows] = useState([
    { stockItem: "Water", quantity: 15, minAmount: 0, units: 'lbs', id: 'WA' },
    { stockItem: "Meatball", quantity: 4, minAmount: 1,  units: 'lbs', id: 'MB' },
    { stockItem: "Spinach", quantity: 10, minAmount: 0,  units: 'lbs', id: 'SP' },
  ]);
  // Text Field Change for Stock Data
  const stockTextFieldChange = (rowInd, colName, value) => {
    stockRows[rowInd][colName] = value;
  };

  // Sets Back in case of Error Stock Data
  const stockHandleExit = () => {
    stockSetRowIndex(-1);
    stockSetColumnIndex(-1);
  }

  /// useState for Menu Data
  const [menuRowIndex, menuSetRowIndex] = useState(-1);
  const [menuColumnIndex, menuSetColumnIndex] = useState(-1);
  const [menuRows, menuSetRows] = useState([
      { menuItem: "1 Topping Pizza", menuPrice: 6.25, isModifier: false, id: 'OT' },
      { menuItem: "Cheese Pizza", menuPrice: 6.25, isModifier: false, id: 'CZ' },
      { menuItem: "Cauliflower Crust", menuPrice: 2.25, isModifier: true, id: 'CC' },
      { menuItem: "Spinach", menuPrice: 0.0, isModifier: true, id: 'SP' },
  
  ]);
  // Text Field Change for Menu Data
  const handleTextFieldChange = (rowInd, colName, value) => {
    menuRows[rowInd][colName] = value;
  };

  // Sets Back in case of Error Menu Data
  const handleExit = () => {
    menuSetRowIndex(-1);
    menuSetColumnIndex(-1);
  }



  // not working exit button
  const exit = <div class = "exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>

  return (
    //&nbsp; is a character entity that denotes a non-breaking or fixed space
    <body class = "background">
    {exit}
    <Typography variant="h2" align='center' style={{marginBottom:"3%", color:"#f7ca28"}}>Inventory</Typography>
    
    <Grid container columnSpacing={{ xs: 1}}>

    
    {/*Menu Table*/}
    <Grid item xs={6}>
    <TableContainer component={Paper} style={{margin: '10px', width:700}}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{backgroundColor:"#f7ca28", fontFamily: 'monospace'}}>
          <TableRow>
            <TableCell>Menu Item</TableCell>
            <TableCell sx={{width: 100}}>Price&nbsp;($)</TableCell>
            <TableCell sx={{width: 100}}>isModifier</TableCell>
            <TableCell sx={{width: 100}}>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {menuRows.map((row, index) => (
              <TableRow key={row.menuItem}>
                <TableCell onClick={() => { menuSetRowIndex(index); menuSetColumnIndex(0); }}>
                  {row.menuItem}
                </TableCell>
                <TableCell onClick={() => { menuSetRowIndex(index); menuSetColumnIndex(0); }}>
                  {
                    menuRowIndex === index && menuColumnIndex === 0 ?
                      <TextField
                        placeholder={row.menuPrice}
                        defaultValue={menuRows[index]["menuPrice"]}
                        onChange={(event) => handleTextFieldChange(index, "menuPrice", event.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleExit();
                          }
                        }}
                      /> : row.menuPrice
                  }
                </TableCell>
                <TableCell>
                  {String(row.isModifier)}
                </TableCell>
                <TableCell>
                  {row.id}
                </TableCell>

              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <button class =  "newitem">New Season Item</button>
    </Grid>

    {/*Stock Table */}
    <Grid item xs={6}>
    <TableContainer component={Paper} style={{margin: '10px', width:700}}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{backgroundColor:"#f7ca28", fontFamily: 'nunito'}}>
          <TableRow>
            <TableCell>Stock Item</TableCell>
            <TableCell sx={{width: 100}}>Quantity</TableCell>
            <TableCell sx={{width: 100}}>Min Amount</TableCell>
            <TableCell sx={{width: 100}}>Units</TableCell>
            <TableCell sx={{width: 100}}>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {stockRows.map((row, index) => (
              <TableRow key={row.stockItem}>
                <TableCell>
                  {row.stockItem}
                </TableCell>
                <TableCell onClick={() => { stockSetRowIndex(index); stockSetColumnIndex(0); }}>
                  {
                    stockRowIndex === index && stockColumnIndex === 0 ?
                      <TextField
                        placeholder={row.menuItem}
                        defaultValue={stockRows[index]["quantity"]}
                        onChange={(event) => handleTextFieldChange(index, "quantity", event.target.value)}
                        onKeyPress={(e) => {
                          if ((e.key === "Enter") ) {
                            stockHandleExit();
                          }
                        }}
                      /> : row.quantity
                  }
                </TableCell>
                <TableCell onClick={() => { stockSetRowIndex(index); stockSetColumnIndex(0); }}>
                  {
                    stockRowIndex === index && stockColumnIndex === 0 ?
                      <TextField
                        placeholder={row.menuItem}
                        defaultValue={stockRows[index]["minAmount"]}
                        onChange={(event) => handleTextFieldChange(index, "minAmount", event.target.value)}
                        onKeyPress={(e) => {
                          if ((e.key === "Enter") ) {
                            stockHandleExit();
                          }
                        }}
                      /> : row.minAmount
                  }
                </TableCell>
                <TableCell onClick={() => { stockSetRowIndex(index); stockSetColumnIndex(0); }}>
                  {
                    stockRowIndex === index && stockColumnIndex === 0 ?
                      <TextField
                        placeholder={row.menuItem}
                        defaultValue={stockRows[index]["units"]}
                        onChange={(event) => handleTextFieldChange(index, "units", event.target.value)}
                        onKeyPress={(e) => {
                          if ((e.key === "Enter") ) {
                            stockHandleExit();
                          }
                        }}
                      /> : row.units
                  }
                </TableCell>
                <TableCell>
                  {row.id}
                </TableCell>

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

/**
 *     <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
    

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
 */


  