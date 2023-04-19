"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCompleteOrder = exports.dbRemoveItemFromOrder = exports.dbAddItemToOrder = exports.dbCreateNewOrder = exports.dbGetEntireOrder = void 0;
const Stock_1 = require("./Stock");
function roundCents(x) {
    return Math.ceil(x * 100) / 100;
}
async function dbGetEntireOrder(dbConn, order_id) {
    const { creation_time, completed } = (await dbConn.sqlQuery(`SELECT * FROM orders WHERE order_id = $1`, [order_id]))[0];
    /* Run an SQL query that combines items from an order with their item types */
    return await dbConn.sqlQuery(`
        SELECT t1.root_item_id, t1.item_id, t1.itemtype_id, t2.is_modifier, t2.is_pizza, t2.min_toppings, t2.max_toppings, t2.item_display_name, t2.item_price FROM
        (
        (SELECT COALESCE(root_item_id, item_id) AS root_item_id, item_id, itemtype_id FROM items WHERE order_id = $1) AS t1
        INNER JOIN
        (SELECT * FROM itemtypes) AS t2
            ON t1.itemtype_id = t2.itemtype_id
    ) ORDER BY (root_item_id, item_id);
   `, [order_id]).then((order_items) => {
        /* Then, inside of typescript, rearrange the data so that the modifiers are sub-objects of their parent items */
        const root_items = order_items.filter((item) => !item.is_modifier);
        const modifiers = order_items.filter((item) => item.is_modifier);
        const root_items_with_modifiers = root_items.map((root_item) => ({
            ...root_item,
            modifiers: modifiers.filter((modifier) => modifier.root_item_id == root_item.item_id)
        }));
        /* calculate order subtotal/taxes/total */
        const subtotal = order_items.map(item => item.item_price).reduce((prev, curr) => prev + curr, 0);
        const taxes = roundCents(subtotal * 0.0825);
        const total = subtotal + taxes;
        /** Return a javascript object containing entire order information */
        return {
            order_id,
            creation_time,
            completed,
            items: root_items_with_modifiers,
            subtotal,
            taxes,
            total
        };
    });
}
exports.dbGetEntireOrder = dbGetEntireOrder;
async function dbCreateNewOrder(dbConn) {
    const { new_order_id } = (await dbConn.sqlQuery('SELECT MAX(order_id)+1 AS new_order_id FROM orders', []))[0];
    await dbConn.sqlUpdate(`INSERT INTO orders VALUES ($1, 'NOW', false)`, [new_order_id]);
    return await dbGetEntireOrder(dbConn, new_order_id);
}
exports.dbCreateNewOrder = dbCreateNewOrder;
async function dbAddItemToOrder(dbConn, order_id, itemtype_id, root_item_id) {
    const { new_item_id: item_id } = (await dbConn.sqlQuery(`SELECT MAX(item_id)+1 AS new_item_id FROM items`, []))[0];
    /** Run an SQL query that combines items from an order with their item types */
    await dbConn.sqlUpdate(`INSERT INTO items (order_id, item_id, itemtype_id, root_item_id) VALUES ($1, $2, $3, $4)`, [order_id, item_id, itemtype_id, root_item_id === undefined ? item_id : root_item_id]);
    return item_id;
}
exports.dbAddItemToOrder = dbAddItemToOrder;
async function dbRemoveItemFromOrder(dbConn, order_id, item_id) {
    order_id; // Surpress error
    /** Run an SQL query that combines items from an order with their item types */
    await dbConn.sqlUpdate(`DELETE FROM items WHERE root_item_id = $1 OR item_id = $1`, [item_id]);
}
exports.dbRemoveItemFromOrder = dbRemoveItemFromOrder;
async function dbCompleteOrder(dbConn, order_id) {
    const { completed } = (await dbConn.sqlQuery(`SELECT * FROM orders WHERE order_id = $1`, [order_id]))[0];
    if (completed) {
        throw `Error: Order ${order_id} is already complete`;
    }
    await dbConn.sqlUpdate(`UPDATE orders SET completed = true WHERE order_id = ${order_id}`);
    return await (0, Stock_1.dbApplyStockCosts)(dbConn, order_id);
}
exports.dbCompleteOrder = dbCompleteOrder;
//# sourceMappingURL=Order.js.map