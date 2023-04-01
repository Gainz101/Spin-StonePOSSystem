import {useState} from 'react';
import React from "react";
import './App.css'; // Tell webpack that App.js uses these styles
import ConsumerView from './ConsumerView';
import Login from './Login';


 

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
    return (
      Login()
    );
  }