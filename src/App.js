import {useState} from 'react';
import React from "react";
import './App.css'; // Tell webpack that App.js uses these styles
import ConsumerView from './ConsumerView';
import Login from './Login';
import { SignUp } from './SignUp';


 

const sceneSelector = () => {
  if (showPayment) {
    return <ConsumerView  />;
  } else if (baseItem) {
    return <CashierView />;
  } else {
    return <ManagerView />;
  }
};


  
  export default function MyApp() {
    const [currentForm, setCurrentForm]=useState("login")
    
    const toggleForm = (formName) =>{
      setCurrentForm(formName)
    }
    return (
      <div className='App'>
      {
        /*Sorry for this compact code if else wasnt working and knew no other way*/
        currentForm==="login" ? <Login onFormSwitch={toggleForm}/> : currentForm==="signup" ? <SignUp onFormSwitch={toggleForm}/> : currentForm ==="consumer_view" ?<ConsumerView onFormSwitch={toggleForm}/>: null//didnt need an else so i put null and it worked i guess
        // The names are declared when the buttons are pressed and formswitch is assign with a string. The strings are then matched here.
        // If the current form is login then stay at login, if its signup then move to sign up screen.
      }
      </div>
    );
  }