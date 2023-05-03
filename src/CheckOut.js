import { useState, useEffect } from 'react';
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css'; // Tell webpack that App.js uses these styles
import { BACKEND_IP } from './BackendConnection';

export default function CheckOut({
    currentOrder,
    setCurrentOrder,
    onFormSwitch,
    setNewOrder,
    setItemType,
}) {
    return (
        <div class="background">
            <div class="payBackground">
                <div class="itemBoxContainer">
                    {
                        currentOrder.items.map(({ item_display_name, item_price, modifiers, item_id }) => {
                            return <div class="itemBox">
                                <div class="contentName">
                                    <strong>{item_display_name}</strong>
                                    <div class="contentPrice">${item_price}</div>
                                </div>
                                <div class="itemBoxContentEditRemove">
                                    {/* <a onClick={() => props.onFormSwitch("customer_view")}>Edit </a> */}
                                    <a onClick={() => {
                                        fetch(`${BACKEND_IP}/order/removeItem?order_id=${currentOrder.order_id}&item_id=${item_id}`)
                                            .then((res) => res.json())
                                            .then((responseJSON) => {
                                                // Refresh the component with the new order items by setting the order state
                                                setCurrentOrder(responseJSON)
                                            })
                                    }}>Remove</a>

                                    {/* Don't show quantities */}
                                    {/* <div class="itemBoxContentQTY"><strong>Qty 1</strong></div> */}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div class="subtotalContainer">
                    <div class="subtotalBox">
                        <div class="contentName">
                            <strong>Subtotal</strong>
                            <div class="contentPrice">${currentOrder.subtotal.toFixed(2)}</div>
                        </div>
                        <div class="contentName">
                            <strong>Taxes</strong>
                            <div class="contentPrice">${currentOrder.taxes.toFixed(2)}</div>
                        </div>
                        <div class="contentName">
                            <strong>Total</strong>
                            <div class="contentPrice">${currentOrder.total.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div class="finish_order">
                    <button class="finish_orderText" onClick={() => {
                        // Completing order
                        fetch(BACKEND_IP + "/order/complete?order_id=" + currentOrder.order_id).then(order => {
                        }, alert).then(() => {
                            setNewOrder()
                            setItemType(null)
                            onFormSwitch("topping_tabs")
                        })
                    }}>
                        Check Out
                    </button>
                </div>


                <div class="order_more"> {/*Todo: change CSS class? */}
                    <button class="order_moreText" onClick={() => {
                        /* Todo: actually complete order */
                        setItemType(null)
                        onFormSwitch("topping_tabs")
                    }}>
                        {/* Rename this? */}
                        Order More
                    </button>
                </div>
            </div>
        </div>
    );
}