import { useState, useEffect } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles

export default function CheckOut(props){
    return(
    <div class="background">
        <div class="payBackground">
            <div class ="itemBoxContainer">
                <div class ="itemBox">
                    <div class="contentName">
                        <strong>2-4 Topping Pizza</strong>
                        <div class ="contentPrice">$2.00</div>
                    </div>
                    <div class ="itemBoxContentEditRemove">
                        <a onClick={() => props.onFormSwitch("toppings_tabs")}>Edit </a><a>Remove</a>
                        <div class ="itemBoxContentQTY"><strong>Qty 1</strong></div>
                    </div>
                </div>
            </div>
            <div class="subtotalContainer">
                <div class="subtotalBox">
                    <div class="contentName">
                        <strong>Subtotal</strong>
                        <div class ="contentPrice">$2.00</div>
                    </div>
                </div>
            </div>
            <div class="finish_order">
                    <button class="finish_orderText" onClick={() => props.onFormSwitch("consumer_view")}>
                        Pay
                    </button>
                </div>
        </div>
    </div>
    );
}