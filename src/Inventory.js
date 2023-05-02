import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  TextField, Button,
  Typography, Paper,
  Table, TableBody,
  TableCell, TableHead,
  TableRow, TableContainer, 
  Grid
} from "@material-ui/core";
import {orange} from '@mui/material/colors'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './ManagerView.css';

import { BACKEND_IP } from './BackendConnection';

/**
 * map of all the names of the col
 */
const stock_column_name_map = {
  stock_id: "ID",
  stock_display_name: "Name",
  stock_amount: "Amount",
  stock_units: "Units",
  minimum_amount: "Minimum Amount"
}


const stock_column_names = Object.entries(stock_column_name_map).map(([sql_column, display_name]) => display_name)
const stock_column_names_sql = Object.entries(stock_column_name_map).map(([sql_column, display_name]) => sql_column)


const itemtype_column_name_map = {
  itemtype_id: "ID",
  item_display_name: "Name",
  item_price: "Price",
  is_hidden: "Delete"
}

const itemtype_column_names = Object.entries(itemtype_column_name_map).map(([sql_column, display_name]) => display_name)
const itemtype_column_names_sql = Object.entries(itemtype_column_name_map).map(([sql_column, display_name]) => sql_column)



/**
 * Inventory Scene that has the 
 * stock table and the items tables
 * @param {*} props 
 * @returns The scene of the inventory 
 */
function Inventory(props) {
  // New Seasonal Item Popup Window Functions
  const [open, setOpen] = useState(false);

  // For seasonal item
  const [itemName, setItemName] = useState(undefined);
  const [itemPrice, setItemPrice] = useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //doesnt save text fields
    setOpen(false);
  };

  const handleOkClose = () => {
    //saves text field
    console.log(itemName, itemPrice)
    setOpen(false);
  };

  function onItemNameChange(event) {
    setItemName(event.target.value)
  }

  function onItemPriceChange(event) {
    setItemPrice(event.target.value)
  }

  //For Excess Stock 
  const [excessStock, setExcessStock] = useState("");

  /// useState for Stock 
  const [stockState, setStockState] = useState(null);
  const [itemState, setItemState] = useState(null);

  /**
   * @returns Loads stocks into our table from the backend
   */
  function loadStocks() {
    fetch(`${BACKEND_IP}/stocks/load`).then((res) => res.json()).then((stockState) => {
      setStockState(stockState)
    }, alert)
  }

  /**
   * @returns Loads items into our table from the backend
   */
  function loadItems() {
    fetch(`${BACKEND_IP}/itemtypes?exclude_hidden=1`).then((res) => res.json()).then((itemState) => {
      setItemState(itemState)
    }, alert)
  }
  // load the stocks first
  useEffect(() => {
    loadStocks()
    loadItems()
  }, [])

  //Exit Button
  const exit = <div class="exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>

  console.log(stockState)

  return <div class='background'>
    {/* &nbsp; is a character entity that denotes a non-breaking or fixed space */}
    {exit}
    <Typography variant="h2" align='center' style={{ marginBottom: "3%", color: "#f7ca28" }}>Inventory</Typography>
    {
      (stockState == null || itemState == null) ?
        <h1> loading </h1> : <div>

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/*Menu table */}
          {          
          < Grid item xs={6}>
            <div  class = "divLeft">
            <button class =  "yellowbtn" onClick={handleClickOpen}>
              New Seasonal Item
            </button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{background:'#9e9e9e', opacity:"60%", color:"black", marginBottom:"5%"}}>New Seasonal Item</DialogTitle>
              <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                placeholder='Item Name'
                variant="standard"
                focused
                style={{marginRight: "20px", width:"50%"}}
                onChange={onItemNameChange}  
                />
                <TextField
                autoFocus
                margin="dense"
                placeholder='$0.00'
                id="Price"
                label="Price"
                variant='standard'
                focused 
                style={{marginRight: "20px", width:"30%"}}
                onChange={onItemPriceChange}
                />
              </DialogContent>
              <DialogActions>
                <button onClick={handleOkClose}>OK</button>
                <button onClick={handleClose}>Close</button>
              </DialogActions>
            </Dialog>
            </div>
            <TableContainer component={Paper} style={{ margin: '10px', width: 550, marginLeft: '10%' }}>
              <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: "#f7ca28", fontFamily: 'nunito' }}>
                  <TableRow>
                    {itemtype_column_names.map((column_name) => {
                      return <TableCell sx={{ width: 100 }}>{column_name}</TableCell>
                    })}
                  </TableRow>
                </TableHead>
                <TableBody> {
                  itemState.toSorted((a,b)=>a.itemtype_id > b.itemtype_id).map((row, index) => {

                    return (<TableRow key={
                      row.itemtype_id
                      }>
                      {
                        itemtype_column_names_sql.map((sql_name) => {
                          const valueString = '' + (row[sql_name])
                          console.log(sql_name, valueString)
                          return (<TableCell>
                            <TextField defaultValue={valueString}
                            onKeyPress={(event)=>{
                              if(event.key === "Enter") {
                              // Update table

                                // Show loading...
                                setItemState(null)
                                
                                // Then fetch update
                                fetch(`${BACKEND_IP}/updateItems?itemtype_id=${row.itemtype_id}&${sql_name}=${event.target.value}`).then((res)=>{
                                  if(res.status != 200) {
                                    throw Error(res.text())
                                  }
                                  return res.json()
                                }).then((new_items)=>{
                                  setItemState(new_items)
                                }, (err)=>{
                                  // Show error
                                  console.log(err)
                                  // Reload stocks
                                  loadItems()
                                })
                              }
                            }}>

                            </TextField>
                          </TableCell>)
                        })
                      }
                    </TableRow>)
                  })
                }
                </TableBody>
              </Table>
            </TableContainer>
            <div  style = {{marginLeft:"9%"}}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{background:'#9e9e9e', opacity:"60%", color:"black", marginBottom:"5%"}}>New Seasonal Item</DialogTitle>
              <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                placeholder='Item Name'
                variant="standard"
                focused
                style={{marginRight: "20px", width:"50%"}}
                />
                <TextField
                autoFocus
                margin="dense"
                placeholder='$0.00'
                id="Price"
                label="Price"
                variant='standard'
                focused 
                style={{marginRight: "20px", width:"30%"}}
                />
              </DialogContent>
              <DialogActions>
                <button onClick={handleOkClose}>OK</button>
                <button onClick={handleClose}>Close</button>
              </DialogActions>
            </Dialog>
            </div>
            </Grid>}

          {/*Stock Table */}
          < Grid item xs={6}>
          <div class = "divLeft">
            <button class =  "yellowbtn" onClick={()=>{
              setStockState(null);
              loadStocks()}}>Show Stocks</button>
            <button class =  "yellowbtn" onClick={()=>{
          // Show loading...
          setStockState(null)
          
          // Then fetch update
          fetch(`${BACKEND_IP}/stocks/getLowStocks`).then((res)=>{
            if(res.status != 200) {
              throw Error(res.text())
            }
            return res.json()
          }).then((low_stocks)=>{
            setStockState(low_stocks)
          }, (err)=>{
            // Show error
            alert(err)
            // Reload stocks
            loadStocks()
          })
    }} >Show Low Stocks</button>
    <TextField
          style={{backgroundColor:"white", marginLeft:"2%", color: "#ffd000"}}
          label="Show Excess Stock"
          variant="filled"
          size="medium"
          
          placeholder='MM-DD-YYYY'
          onKeyPress={(e)=>{
            if(e.key == "Enter") {
              fetch(`${BACKEND_IP}/stocks/getExcessStocksSince?date=${e.target.value}`).then((res)=>{
                if(res.status != 200) {
                  throw Error(res.text())
                }
                return res.json()
              }).then((excess_stocks)=>{
                setStockState(excess_stocks)
              }, (err)=>{
                // Show error
                err.then((e)=>alert(e))
                // Reload stocks
                loadStocks()
              })
            }
          }}
          onChange={(e)=>{}}
          sx={{
            "& .MuiInputBase-root": {
                color: '#ffd000'
            }
        }}
        />
        </div>
            <TableContainer component={Paper} style={{ margin: '10px', width: 600, marginLeft: "9%" }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: "#f7ca28", fontFamily: 'nunito' }}>
                  <TableRow>
                    {stock_column_names.map((column_name) => {
                      return <TableCell sx={{ width: 100 }}>{column_name}</TableCell>
                    })}
                  </TableRow>
                </TableHead>
                <TableBody> {
                  stockState.toSorted((a,b)=>a.stock_id > b.stock_id).map((row, index) => {


                    return (<TableRow key={
                      row.stock_id
                      }>
                      {
                        stock_column_names_sql.map((sql_name) => {
                          const valueString = '' + (row[sql_name])
                          console.log(sql_name, valueString)
                          return (<TableCell>
                            <TextField defaultValue={valueString}
                            onKeyPress={(event)=>{
                              if(event.key === "Enter") {
                                // Update table

                                // Show loading...
                                setStockState(null)
                                
                                // Then fetch update
                                fetch(`${BACKEND_IP}/stocks/update?stock_id=${row.stock_id}&${sql_name}=${event.target.value}`).then((res)=>{
                                  if(res.status != 200) {
                                    throw Error(res.text())
                                  }
                                  return res.json()
                                }).then((new_stocks)=>{
                                  setStockState(new_stocks)
                                }, (err)=>{
                                  // Show error
                                  console.log(err)
                                  // Reload stocks
                                  loadStocks()
                                })
                              }
                            }}>

                            </TextField>
                          </TableCell>)
                        })
                      }
                    </TableRow>)
                  })
                }
                </TableBody>
              </Table>
            </TableContainer>
            
           </Grid>
          </Grid>
        </div>
        
    }
    
  </div >
}
export default Inventory;

