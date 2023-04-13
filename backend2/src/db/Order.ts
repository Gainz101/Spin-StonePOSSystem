import { dbConnection } from "./dbConnection";
import { SQL_Order, SQL_ID, SQL_TimeStamp } from "./sqlSchema";

export class Order implements SQL_Order {
    private constructor(
        public order_id: SQL_ID,
        public creation_time: SQL_TimeStamp,
        public completed: boolean
    ) { }

    // Order 125023
    public static async dbGetEntireOrder(dbConn: dbConnection, order_id: number = 125023) {
        const {
            creation_time,
            completed
        } = (await dbConn.sqlQuery<{
            order_id: number, // unused
            creation_time: string, // This might not be a string
            completed: boolean
        }>(`SELECT * FROM orders WHERE order_id = $1`, [order_id]))[0]

        return await dbConn.sqlQuery<{
            root_item_id: number,
            item_id: number,
            is_modifier: boolean,//
            itemtype_id: number,
            item_display_name: string,
            item_price: number
        }>(
            `SELECT t1.root_item_id, t1.item_id, t2.is_modifier, t1.itemtype_id, t2.item_display_name, t2.item_price FROM
        (
         (SELECT COALESCE(root_item_id, item_id) AS root_item_id, item_id, itemtype_id FROM items WHERE order_id = $1) AS t1
           INNER JOIN
         (SELECT is_modifier, itemtype_id, item_display_name, item_price FROM itemtypes) AS t2
             ON t1.itemtype_id = t2.itemtype_id
       ) ORDER BY (root_item_id, item_id);`, [order_id]).then((order_items) => {

                const root_items = order_items.filter((item) => !item.is_modifier)
                const modifiers = order_items.filter((item) => item.is_modifier)

                const root_items_with_modifiers = root_items.map((root_item) => ({
                    ...root_item,
                    modifiers: modifiers.filter((modifier)=>modifier.root_item_id == root_item.item_id)
                }))

                return {
                    order_id,
                    creation_time,
                    completed,
                    items: root_items_with_modifiers
                }
            })
    }
}