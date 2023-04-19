"use strict";
/**
 * index.ts - Entrypoint for backend server
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Module imports
const express_1 = tslib_1.__importDefault(require("express"));
const index_1 = tslib_1.__importDefault(require("./db/index"));
const ItemType_1 = require("./db/ItemType");
const Order_1 = require("./db/Order");
// Constants
const REACT_APP_DIRECTORY = '../build';
const PORT = 5001;
/** Creates an error handler for a HTTP <--> Postgres database request */
const createSQLErrorHandler = (response) => (err) => {
    /* If there is an SQL error, send it back to the client
    Note: this is a bad practice because it lets hackers easily figure out how to hack your program
    */
    let message = err;
    if ("message" in err) {
        message = err.message;
    }
    response.status(500).send(message);
};
function createOptionalParser(parser, defaultValue) {
    return (str) => {
        return str == undefined ? defaultValue : parser(str);
    };
}
function parseIntStrict(str) {
    const result = parseInt(Number(str).toString());
    if (Number.isNaN(result)) {
        throw `expected an integer, got "${str}"`;
    }
    return result;
}
const parseIntStrictOptional = createOptionalParser(parseIntStrict);
/**
 * Helper function to parse HTTP queries and ensure that they have the correct parameters passed to them
 */
function parseQuery(obj, parseArray) {
    const converted = {};
    for (let [paramName, parser] of Object.entries(parseArray)) {
        try {
            converted[paramName] = parser(obj[paramName]);
        }
        catch (e) {
            throw `HTTP query parameter "${paramName}": ${e}`;
        }
    }
    return converted;
}
// Express module
function startHosting(dbConn) {
    const app = (0, express_1.default)();
    // Serve the static react app (html, js, css)
    app.use('/', express_1.default.static(REACT_APP_DIRECTORY));
    // Add Middleware to allow CORS
    app.use(function (request, response, next) {
        request; // surpress error message
        // Enable Cross origin resource sharing
        // https://web.dev/cross-origin-resource-sharing/
        response.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    // Send pretty
    app.set('json spaces', 40);
    // API endpoint for ItemTypes
    app.use('/itemTypes', (request, response) => {
        request; // surpress error message
        (0, ItemType_1.dbGetItemTypes)(dbConn)
            .then(itemTypes => response.send(itemTypes), createSQLErrorHandler(response));
    });
    app.use('/order/load', (request, response) => {
        const { order_id } = parseQuery(request.query, {
            order_id: parseIntStrict
        });
        (0, Order_1.dbGetEntireOrder)(dbConn, order_id)
            .then(entire_order => response.send(entire_order), createSQLErrorHandler(response));
    });
    /*
    /order/addItem?order_id=12345&itemtype_id=5
    /order/addItem?order_id=12345&itemtype_id=3001&root_item_id=3000

    returns new order
    */
    app.use('/order/addItem', (request, response) => {
        const { order_id, itemtype_id, root_item_id } = parseQuery(request.query, {
            order_id: parseIntStrict,
            itemtype_id: parseIntStrict,
            root_item_id: parseIntStrictOptional // Optional
        });
        (0, Order_1.dbAddItemToOrder)(dbConn, order_id, itemtype_id, root_item_id)
            .then(() => (0, Order_1.dbGetEntireOrder)(dbConn, order_id).then(entire_order => response.send(entire_order)), createSQLErrorHandler(response));
    });
    app.use('/order/removeItem', (request, response) => {
        const { order_id, item_id } = parseQuery(request.query, {
            order_id: parseIntStrict,
            item_id: parseIntStrict // Required param
        });
        (0, Order_1.dbRemoveItemFromOrder)(dbConn, order_id, item_id).then(() => (0, Order_1.dbGetEntireOrder)(dbConn, order_id).then(entire_order => response.send(entire_order)), createSQLErrorHandler(response));
    });
    app.use('/order/complete', (request, response) => {
        const { order_id } = parseQuery(request.query, {
            order_id: parseIntStrict, // Required param                
        });
        (0, Order_1.dbCompleteOrder)(dbConn, order_id)
            .then(() => (0, Order_1.dbGetEntireOrder)(dbConn, order_id).then(entire_order => response.send(entire_order)), createSQLErrorHandler(response));
    });
    app.use('/order/new', (request, response) => {
        (0, Order_1.dbCreateNewOrder)(dbConn).then((new_order) => response.send(new_order), createSQLErrorHandler(response));
    });
    // API endpoint for baseItems
    app.use('/baseItems', (request, response) => {
        request; // surpress error message
        (0, ItemType_1.dbGetItemTypes)(dbConn)
            .then(itemTypes => itemTypes.filter((item) => item.is_pizza))
            .then(itemTypes => {
            response.send(itemTypes.map(({ item_display_name, itemtype_id }) => ({
                item_display_name,
                itemtype_id
            })));
        }, createSQLErrorHandler(response));
    });
    // Start hosting the server on PORT
    app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT}`);
        console.log(`Hosting ${REACT_APP_DIRECTORY}`);
    });
}
index_1.default.connect().then(startHosting, (err) => { console.log("Failed to connect to DB", err); });
//# sourceMappingURL=index.js.map