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

import './Inventory.css';

import { BACKEND_IP } from './BackendConnection';


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
}

const itemtype_column_names = Object.entries(itemtype_column_name_map).map(([sql_column, display_name]) => display_name)
const itemtype_column_names_sql = Object.entries(itemtype_column_name_map).map(([sql_column, display_name]) => sql_column)




function Inventory(props) {
  // New Seasonal Item Popup Window Functions
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //doesnt save text fields
    setOpen(false);
  };

  const handleOkClose = () => {
    //saves text field
    setOpen(false);
  };

  //For Excess Stock 
  const [excessStock, setExcessStock] = useState("");

  /// useState for Stock 
  const [stockState, setStockState] = useState(null);
  const [itemState, setItemState] = useState(null);


  function loadStocks() {
    fetch(`${BACKEND_IP}/stocks/load`).then((res) => res.json()).then((stockState) => {
      setStockState(stockState)
    }, alert)
  }

  function loadItems() {
    fetch(`${BACKEND_IP}/itemtypes`).then((res) => res.json()).then((itemState) => {
      setItemState(itemState)
    }, alert)
  }
  // load the stocks first
  useEffect(() => {
    loadStocks()
    loadItems()
  }, [])

  // not working exit button
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
            <button class =  "newitem" onClick={handleClickOpen}>
              New Season Item
            </button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{background:'#9e9e9e', opacity:"60%", color:"black", marginBottom:"5%"}}>New Seasonal Item</DialogTitle>
              <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="id"
                label="ID"
                placeholder='#'
                variant="standard"
                focused
                style={{marginRight: "20px", width:"10%"}}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                placeholder='Item Name'
                variant="standard"
                focused
                style={{marginRight: "20px", width:"40%"}}
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
            <TableContainer component={Paper} style={{ margin: '10px', width: 560, marginLeft: "9%" }}>
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
            <div style={{marginLeft: "8%"}}>
            <button class =  "newitem" onClick={()=>{
              setStockState(null);
              loadStocks()}}>Show Stocks</button>
    <button class =  "newitem" onClick={()=>{
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
          </Grid>
          </Grid>
        </div>
        
    }
    
  </div >
}
export default Inventory;


/** Old Inventory.js */
// import { useState } from 'react';
// import * as React from 'react';
// import {
//     TextField, Button,
//     Typography, Paper,
//     Table, TableBody,
//     TableCell, TableHead,
//     TableRow, TableContainer, Grid
// } from "@material-ui/core";
// import Dialog from '@mui/material/Dialog';



// import './Inventory.css';



// function Inventory(props) {
//     /// useState for Stock 
//     const [stockRowIndex, stockSetRowIndex] = useState(-1);
//     const [stockColumnIndex, stockSetColumnIndex] = useState(-1);
//     const [stockRows, stockSetRows] = useState([
//         { stock_display_name: "Water", stock_amount: 15, minimum_amount: 0, stock_units: 'lbs', stock_id: 'WA' },
//         { stock_display_name: "Meatball", stock_amount: 4, minimum_amount: 1, stock_units: 'lbs', stock_id: 'MB' },
//         { stock_display_name: "Spinach", stock_amount: 10, minimum_amount: 0, stock_units: 'lbs', stock_id: 'SP' },
//     ]);
//     // Text Field Change for Stock Data
//     const stockTextFieldChange = (rowInd, colName, value) => {
//         stockRows[rowInd][colName] = value;
//     };

//     // Sets Back in case of Error Stock Data
//     const stockHandleExit = () => {
//         stockSetRowIndex(-1);
//         stockSetColumnIndex(-1);
//     }

//     /// useState for Menu Data
//     const [menuRowIndex, menuSetRowIndex] = useState(-1);
//     const [menuColumnIndex, menuSetColumnIndex] = useState(-1);
//     const [menuRows, menuSetRows] = useState([
//         { menuItem: "1 Topping Pizza", menuPrice: 6.25, isModifier: false, stock_id: 'OT' },
//         { menuItem: "Cheese Pizza", menuPrice: 6.25, isModifier: false, stock_id: 'CZ' },
//         { menuItem: "Cauliflower Crust", menuPrice: 2.25, isModifier: true, stock_id: 'CC' },
//         { menuItem: "Spinach", menuPrice: 0.0, isModifier: true, stock_id: 'SP' },

//     ]);
//     // Text Field Change for Menu Data
//     const handleTextFieldChange = (rowInd, colName, value) => {
//         alert(`${rowInd} ${colName} ${value}`)
//         menuRows[rowInd][colName] = value;
//     };

//     // Sets Back in case of Error Menu Data
//     const handleExit = () => {
//         menuSetRowIndex(-1);
//         menuSetColumnIndex(-1);
//     }



//     // not working exit button
//     const exit = <div class="exit"><button onClick={() => props.onFormSwitch("manager_view")} type="submit" class="exit_text">Exit</button></div>

//     return (
//         //&nbsp; is a character entity that denotes a non-breaking or fixed space
//         <body class="background">
//             {exit}
//             <Typography variant="h2" align='center' style={{ marginBottom: "3%", color: "#f7ca28" }}>Inventory</Typography>

//             <Grid container columnSpacing={{ xs: 1 }}>


//                 {/*Menu Table*/}
//                 <Grid item xs={6}>
//                     <TableContainer component={Paper} style={{ margin: '10px', width: 700 }}>
//                         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                             <TableHead style={{ backgroundColor: "#f7ca28", fontFamily: 'monospace' }}>
//                                 <TableRow>
//                                     <TableCell>Menu Item</TableCell>
//                                     <TableCell sx={{ width: 100 }}>Price&nbsp;($)</TableCell>
//                                     <TableCell sx={{ width: 100 }}>isModifier</TableCell>
//                                     <TableCell sx={{ width: 100 }}>stock_id</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {menuRows.map((row, index) => (
//                                     <TableRow key={row.menuItem}>
//                                         <TableCell onClick={() => { menuSetRowIndex(index); menuSetColumnIndex(0); }}>
//                                             {row.menuItem}
//                                         </TableCell>
//                                         <TableCell onClick={() => { menuSetRowIndex(index); menuSetColumnIndex(0); }}>
//                                             {
//                                                 menuRowIndex === index && menuColumnIndex === 0 ?
//                                                     <TextField
//                                                         placeholder={row.menuPrice}
//                                                         defaultValue={menuRows[index]["menuPrice"]}
//                                                         onChange={(event) => { }}
//                                                         onKeyPress={(e) => {
//                                                             if (e.key === "Enter") {
//                                                                 handleTextFieldChange(index, "minimum_amount", event.target.value)
//                                                             }
//                                                         }}
//                                                     /> : row.menuPrice
//                                             }
//                                         </TableCell>
//                                         <TableCell>
//                                             {String(row.isModifier)}
//                                         </TableCell>
//                                         <TableCell>
//                                             {row.stock_id}
//                                         </TableCell>

//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <button class="newitem">New Season Item</button>
//                 </Grid>

//                 {/*Stock Table */}
//                 <Grid item xs={6}>
//                     <TableContainer component={Paper} style={{ margin: '10px', width: 700 }}>
//                         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                             <TableHead style={{ backgroundColor: "#f7ca28", fontFamily: 'nunito' }}>
//                                 <TableRow>
//                                     <TableCell>Stock Item</TableCell>
//                                     <TableCell sx={{ width: 100 }}>stock_amount</TableCell>
//                                     <TableCell sx={{ width: 100 }}>Min Amount</TableCell>
//                                     <TableCell sx={{ width: 100 }}>stock_units</TableCell>
//                                     <TableCell sx={{ width: 100 }}>stock_id</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {stockRows.map((row, index) => (
//                                     <TableRow key={row.stock_display_name}>
//                                         <TableCell>
//                                             {row.stock_display_name}
//                                         </TableCell>
//                                         <TableCell onClick={() => { stockSetRowIndex(index); stockSetColumnIndex(0); }}>
//                                             {
//                                                 stockRowIndex === index && stockColumnIndex === 0 ?
//                                                     <TextField
//                                                         placeholder={row.menuItem}
//                                                         defaultValue={stockRows[index]["stock_amount"]}
//                                                         onChange={(event) => handleTextFieldChange(index, "stock_amount", event.target.value)}
//                                                         onKeyPress={(e) => {
//                                                             if ((e.key === "Enter")) {
//                                                                 stockHandleExit();
//                                                             }
//                                                         }}
//                                                     /> : row.stock_amount
//                                             }
//                                         </TableCell>
//                                         <TableCell onClick={() => { stockSetRowIndex(index); stockSetColumnIndex(0); }}>
//                                             {
//                                                 stockRowIndex === index && stockColumnIndex === 0 ?
//                                                     <TextField
//                                                         placeholder={row.menuItem}
//                                                         defaultValue={stockRows[index]["minimum_amount"]}
//                                                         onChange={(event) => { }}
//                                                         onKeyPress={(e) => {
//                                                             if ((e.key === "Enter")) {
//                                                                 stockHandleExit();
//                                                             }
//                                                         }}
//                                                     /> : row.minimum_amount
//                                             }
//                                         </TableCell>
//                                         <TableCell onClick={() => { stockSetRowIndex(index); stockSetColumnIndex(0); }}>
//                                             {
//                                                 stockRowIndex === index && stockColumnIndex === 0 ?
//                                                     <TextField
//                                                         placeholder={row.menuItem}
//                                                         defaultValue={stockRows[index]["stock_units"]}
//                                                         onChange={(event) => handleTextFieldChange(index, "stock_units", event.target.value)}
//                                                         onKeyPress={(e) => {
//                                                             if ((e.key === "Enter")) {
//                                                                 stockHandleExit();
//                                                             }
//                                                         }}
//                                                     /> : row.stock_units
//                                             }
//                                         </TableCell>
//                                         <TableCell>
//                                             {row.stock_id}
//                                         </TableCell>

//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Grid>

//             </Grid>
//         </body>
//     );
// }
// export default Inventory;

// /**
//  *     <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
    

//     <Grid item xs={6}>
//     <TableContainer component={Paper} style={{margin: '10px', width:700}}>
//     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead style={{backgroundColor:"#8458B3", fontFamily: 'monospace'}}>
//           <TableRow>
//             <TableCell>Menu Item</TableCell>
//             <TableCell align="right">Price&nbsp;($)</TableCell>
//             <TableCell align="right">stock_id</TableCell>
//             <TableCell align="right">isModifier</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {menuRows.map((menuRows) => (
//             <TableRow
//               key={menuRows.menuItem}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {menuRows.menuItem}
//               </TableCell>
//               <TableCell align="right">{menuRows.menuPrice}</TableCell>
//               <TableCell align="right">{menuRows.stock_id}</TableCell>
//               <TableCell align="right">{String(menuRows.isModifier)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </Grid>


//     <Grid item xs={6}>
//     <TableContainer component={Paper} style={{margin: '10px', width:700}}>
//     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead style={{backgroundColor:"#8458B3", fontFamily: 'monospace'}}>
//           <TableRow>
//             <TableCell>Stock stock_id</TableCell>
//             <TableCell align="right">Stock Name</TableCell>
//             <TableCell align="right">stock_amount&nbsp;</TableCell>
//             <TableCell align="right">Minimum Amount</TableCell>
//             <TableCell align="right">Unit</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {stockRows.map((stockRows) => (
//             <TableRow
//               key={stockRows.menuItem}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {stockRows.stockstock_id}
//               </TableCell>
//               <TableCell align="right">{stockRows.stockName}</TableCell>
//               <TableCell align="right">{stockRows.stock_amount}</TableCell>
//               <TableCell align="right">{stockRows.minimum_amount}</TableCell>
//               <TableCell align="right">{stockRows.stock_units}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </Grid>


//     </Grid>
//  */


