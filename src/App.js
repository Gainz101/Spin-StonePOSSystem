import { useState } from 'react';
import React from "react";
import './App.css'; // Tell webpack that App.js uses these styles
import CustomerView from './CustomerView';
import Login from './Login';
import { SignUp } from './SignUp';
import CashierView from './Cashier';
import ToppingTabs from './ToppingTabs';
import ManagerSelect from './ManagerView';
import CheckOut from './CheckOut';
import SalesReport from './SaleReport';
import XZReport from './XZReport';
import Inventory from './Inventory';
import OrderHistory from './OrderHistory';


export default function MyApp() {
  const [currentForm, setCurrentForm]=useState("login")
  
  return (
    <div className='App'>
    {
      /*Sorry for this compact code if else wasnt working and knew no other way*/
      currentForm === "login" ? <Login onFormSwitch={setCurrentForm}/>: 
      currentForm === "signup" ? <SignUp onFormSwitch={setCurrentForm}/>: 
      currentForm === "customer_view" ? <CustomerView onFormSwitch={setCurrentForm}/>: 
      currentForm === "cashier_view" ? <CashierView onFormSwitch={setCurrentForm}/>:
      currentForm === "manager_view"? <ManagerSelect onFormSwitch={setCurrentForm}/>:
      currentForm === "checkout_view"? <CheckOut onFormSwitch={setCurrentForm}/>: 
      currentForm === "sales_view" ? <SalesReport onFormSwitch={setCurrentForm}/> :
      currentForm === "xz_view" ? <XZReport onFormSwitch={setCurrentForm}/> : 
      currentForm === "inventory_view" ? <Inventory onFormSwitch={setCurrentForm}/> : 
      currentForm === "order_view" ? <OrderHistory onFormSwitch={setCurrentForm}/> : 
      null //didnt need an else so i put null and it worked i guess
      // The names are declared when the buttons are pressed and formswitch is assign with a string. The strings are then matched here.
      // If the current form is login then stay at login, if its signup then move to sign up screen.
    }
    </div>
  );
}