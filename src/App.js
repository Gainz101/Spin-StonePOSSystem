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
  
  const toggleForm = (formName) =>{
    setCurrentForm(formName)
  }
  return (
    <div className='App'>
    {
      /*Sorry for this compact code if else wasnt working and knew no other way*/
      currentForm === "login" ? <Login onFormSwitch={toggleForm}/>: 
      currentForm === "signup" ? <SignUp onFormSwitch={toggleForm}/>: 
      currentForm === "customer_view" ? <CustomerView onFormSwitch={toggleForm}/>: 
      currentForm === "cashier_view" ? <CashierView onFormSwitch={toggleForm}/>:
      currentForm === "manager_view"? <ManagerSelect onFormSwitch={toggleForm}/>:
      currentForm === "checkout_view"? <CheckOut onFormSwitch={toggleForm}/>: 
      currentForm === "sales_view" ? <SalesReport onFormSwitch={toggleForm}/> :
      currentForm === "xz_view" ? <XZReport onFormSwitch={toggleForm}/> : 
      currentForm === "inventory_view" ? <Inventory onFormSwitch={toggleForm}/> : 
      currentForm === "order_view" ? <OrderHistory onFormSwitch={toggleForm}/> : 
      null //didnt need an else so i put null and it worked i guess
      // The names are declared when the buttons are pressed and formswitch is assign with a string. The strings are then matched here.
      // If the current form is login then stay at login, if its signup then move to sign up screen.
    }
    </div>
  );
}