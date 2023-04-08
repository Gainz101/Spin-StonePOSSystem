import { useState, useEffect } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles

export default function CheckOut(){
    return(
    <div>
        <div class="background">
            <div class ="itemBoxContainer">
                <div class ="itemBox">
                    <div class="itemBoxContentName">
                        <strong>2-4 Topping Pizza</strong>
                        <div class ="itemBoxContentPrice">$2.00</div>
                    </div>
                    <div class ="itemBoxContentEditRemove">
                        <a>Edit </a><a>Remove</a>
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
        </div>
    </div>
    );
}