import { SQL_Item, SQL_ItemType, SQL_Order } from "./SQL_Schema";
import { dbApplyStockCosts } from "./Stock";
import { dbConnection } from "./dbConnection";
import { randomId } from "./random"

function roundCents(x: number) {
    return Math.ceil(x * 100) / 100
}

export async function dbGetEntireOrder(dbConn: dbConnection, order_id: number) {
    const {
        creation_time,
        completed
    } = (await dbConn.sqlQuery<SQL_Order>(`SELECT * FROM orders WHERE order_id = $1`, [order_id]))[0]

    /* Run an SQL query that combines items from an order with their item types */
    return await dbConn.sqlQuery<SQL_ItemType & SQL_Item>(`
        SELECT t1.root_item_id, t1.item_id, t1.itemtype_id, t2.is_modifier, t2.is_pizza, t2.min_toppings, t2.max_toppings, t2.item_display_name, t2.item_price FROM
        (
        (SELECT COALESCE(root_item_id, item_id) AS root_item_id, item_id, itemtype_id FROM items WHERE order_id = $1) AS t1
        INNER JOIN
        (SELECT * FROM itemtypes) AS t2
            ON t1.itemtype_id = t2.itemtype_id
    ) ORDER BY (root_item_id, item_id);
   `, [order_id]).then((order_items) => {

        /* Then, inside of typescript, rearrange the data so that the modifiers are sub-objects of their parent items */
        const root_items = order_items.filter((item) => !item.is_modifier)
        const modifiers = order_items.filter((item) => item.is_modifier)

        const root_items_with_modifiers = root_items.map((root_item) => ({
            ...root_item,
            modifiers: modifiers.filter((modifier) => modifier.root_item_id == root_item.item_id)
        }))

        /* calculate order subtotal/taxes/total */
        const subtotal = order_items.map(item => item.item_price).reduce((prev, curr) => prev + curr, 0)
        const taxes = roundCents(subtotal * 0.0825)
        const total = subtotal + taxes

        /** Return a javascript object containing entire order information */
        return {
            order_id,
            creation_time,
            completed,
            items: root_items_with_modifiers,
            subtotal,
            taxes,
            total
        }
    })
}

export async function dbCreateNewOrder(dbConn: dbConnection) {
    // const {new_order_id} = (await dbConn.sqlQuery<{
    //     new_order_id: number
    // }>('SELECT MAX(order_id)+1 AS new_order_id FROM orders', []))[0]
    const new_order_id = randomId();

    await dbConn.sqlUpdate(`INSERT INTO orders VALUES ($1, 'NOW', false)`, [new_order_id]);

    return await dbGetEntireOrder(dbConn, new_order_id)
}

export async function dbAddItemToOrder(dbConn: dbConnection, order_id: number, itemtype_id: number, root_item_id?: number) {
    // Just create GUID instead of sequential orders
    // const {
    //     new_item_id: item_id
    // } = (await dbConn.sqlQuery<{
    //     new_item_id: number
    // }>(`SELECT MAX(item_id)+1 AS new_item_id FROM items`, []))[0]

    const item_id = randomId();

    /** Run an SQL query that combines items from an order with their item types */
    await dbConn.sqlUpdate(`INSERT INTO items (order_id, item_id, itemtype_id, root_item_id) VALUES ($1, $2, $3, $4)`, 
     [order_id, item_id, itemtype_id, root_item_id === undefined ? item_id : root_item_id])
     
     return item_id;
}

export async function dbRemoveItemFromOrder(dbConn: dbConnection, order_id: number, item_id: number) {
    order_id; // Surpress error

    /** Run an SQL query that combines items from an order with their item types */
    await dbConn.sqlUpdate(`DELETE FROM items WHERE root_item_id = $1 OR item_id = $1`, 
     [item_id])
}

export async function dbCompleteOrder(dbConn: dbConnection, order_id: number) {
    const {
        completed
    } = (await dbConn.sqlQuery<SQL_Order>(`SELECT * FROM orders WHERE order_id = $1`, [order_id]))[0]

    if(completed) {
        throw `Error: Order ${order_id} is already complete`
    }
    
    await dbConn.sqlUpdate(`UPDATE orders SET completed = true WHERE order_id = ${order_id}`)
    
    return await dbApplyStockCosts(dbConn, order_id)
}
