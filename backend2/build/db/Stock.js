"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbApplyStockCosts = void 0;
/** Run an SQL query that combines items from an order with their ingredients (via their item type), then
 * applies this to the stocks
 */
async function dbApplyStockCosts(dbConn, order_id) {
    return await dbConn.sqlUpdate(`
    UPDATE inventory SET stock_amount = stock_amount - stock_cost
        FROM (SELECT stock_id, SUM(stock_cost) AS stock_cost FROM (
            inventory_costs
                INNER JOIN
            (SELECT itemtype_id FROM items WHERE order_id = $1) AS order_items
                ON order_items.itemtype_id = inventory_costs.itemtype_id
        ) GROUP BY inventory_costs.stock_id)
    AS stock_costs WHERE stock_costs.stock_id = inventory.stock_id`, [order_id]);
}
exports.dbApplyStockCosts = dbApplyStockCosts;
//# sourceMappingURL=Stock.js.map