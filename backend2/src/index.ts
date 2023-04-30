/**
 * index.ts - Entrypoint for backend server
 */

// Module imports
import express from 'express';
import db from './db/index'
import { dbConnection } from './db/dbConnection';
import { dbGetItemTypes } from './db/ItemType'
import { dbAddItemToOrder, dbCompleteOrder, dbCreateNewOrder, dbGetEntireOrder, dbRemoveItemFromOrder } from './db/Order';
import { dbGetStocks } from './db/Stock';


// Constants
const REACT_APP_DIRECTORY = '../build'
const PORT = 5001

/** Creates an error handler for a HTTP <--> Postgres database request */
const createSQLErrorHandler = (response: any) => (err: any) => {
    /* If there is an SQL error, send it back to the client
    Note: this is a bad practice because it lets hackers easily figure out how to hack your program
    */
    let message = err;
    if ("message" in err) {
        message = err.message
    }
    response.status(500).send(message)
}


type StringParser<R> = (input: string, ...args: any[]) => R;
type ParserMap = Record<string, StringParser<any>>
type ParsedQuery<T extends ParserMap> = {
    [K in keyof T]: T[K] extends StringParser<infer U> ? U : unknown
}

function createOptionalParser<T, D extends T>(parser: StringParser<T>, defaultValue?: D): StringParser<T | undefined> {
    return (str: string) => {
        return str == undefined ? defaultValue : parser(str)
    }
}

function parseStockId(stock_id: string) {
    if (stock_id.length != 2) {
        throw `expected 2 letter stock ID, got ${stock_id}`
    }
    return stock_id.toUpperCase();
}

// const parseStockIdOptional = createOptionalParser(parseStockId);

function parseIntStrict(str: string): number {
    const result = parseInt(Number(str).toString())
    if (Number.isNaN(result)) {
        throw `expected an integer, got "${str}"`
    }
    return result;
}

const parseIntStrictOptional = createOptionalParser(parseIntStrict)

function parseDoubleStrict(str: string): number {
    const result = Number(str)
    if (Number.isNaN(result)) {
        throw `expected an integer, got "${str}"`
    }
    return result;
}

const parseDoubleStrictOptional = createOptionalParser(parseDoubleStrict)


function parseIntListStrict(str: string): number[] {
    const results = [];
    for (let number_string of str.split(",")) {
        results.push(parseIntStrict(number_string));
    }
    return results;
}

function parseString(str: string) {
    return str;
}

const parseStringOptional = createOptionalParser(parseString);




// const parseStockCode = (s: string) => (s.length == 2) && s.match(/[A-Za-z][A-Za-z]/)
// const parseStockCodeOptional = createOptionalParser(parseStockCode)

// const parseString = (s: string) => s;
// const parseStringOptional = createOptionalParser(parseString)

/**
 * Helper function to parse HTTP queries and ensure that they have the correct parameters passed to them
 */
function parseQuery<T extends ParserMap>(obj: Record<string, string>, parseArray: T): ParsedQuery<T> {
    const converted: any = {}
    for (let [paramName, parser] of Object.entries(parseArray)) {
        try {
            converted[paramName] = parser(obj[paramName])
        } catch (e) {
            throw `HTTP query parameter "${paramName}": ${e}`
        }
    }
    return converted
}

function escapeSQL(value: any) {
    if (typeof (value) == 'string') {
        return `'${value.replace('\'', '\'\'')}'`
    } else {
        return value.toString()
    }
}



// Express module
function startHosting(dbConn: dbConnection) {
    const app = express();

    // Serve the static react app (html, js, css)
    app.use('/', express.static(REACT_APP_DIRECTORY))

    // Add Middleware to allow CORS
    app.use(function (request, response, next) {
        request; // surpress error message

        // Enable Cross origin resource sharing
        // https://web.dev/cross-origin-resource-sharing/
        response.setHeader('Access-Control-Allow-Origin', '*')

        next();
    });

    // Send pretty
    app.set('json spaces', 40);

    // API endpoint for ItemTypes
    app.use('/itemTypes', (request, response) => {
        request; // surpress error message

        dbGetItemTypes(dbConn)
            .then(itemTypes => response.send(itemTypes),
                createSQLErrorHandler(response))
    })

    app.use('/order/load', (request, response) => {
        const { order_id } = parseQuery(request.query as any, {
            order_id: parseIntStrict
        });

        dbGetEntireOrder(dbConn, order_id)
            .then(entire_order => response.send(entire_order),
                createSQLErrorHandler(response))
    })

    /*
    /order/addItem?order_id=12345&itemtype_id=5
    /order/addItem?order_id=12345&itemtype_id=3001&root_item_id=3000
    /order/addItem?order_id=12345&itemtype_id=5,6,7&root_item_id=6990

    returns new order

    EDIT: can take multiple items now!
    */
    app.use('/order/addItem', (request, response) => {
        const { order_id,
            itemtype_ids,
            root_item_id } = parseQuery(request.query as any, {
                order_id: parseIntStrict, // Required param
                itemtype_ids: parseIntListStrict, // Required param
                root_item_id: parseIntStrictOptional // Optional
            });

        /* Promise.all waits for all items to be added first, then executes the 'then' function */

        Promise.all(itemtype_ids.map((itemtype_id) => dbAddItemToOrder(dbConn, order_id, itemtype_id, root_item_id)))
            .then(
                (result) => dbGetEntireOrder(dbConn, order_id).then(entire_order => response.send({
                    entire_order,
                    // Send new item ids with order query
                    new_items: result
                })),
                createSQLErrorHandler(response)
            )
    })

    app.use('/order/removeItem', (request, response) => {
        const { order_id,
            item_id } = parseQuery(request.query as any, {
                order_id: parseIntStrict, // Required param
                item_id: parseIntStrict // Required param
            });

        dbRemoveItemFromOrder(dbConn, order_id, item_id).then(
            () => dbGetEntireOrder(dbConn, order_id).then(entire_order => response.send(entire_order)),
            createSQLErrorHandler(response)
        )
    })

    app.use('/order/complete', (request, response) => {
        const { order_id } = parseQuery(request.query as any, {
            order_id: parseIntStrict, // Required param                
        });

        dbCompleteOrder(dbConn, order_id)
            .then(() => dbGetEntireOrder(dbConn, order_id).then(entire_order => response.send(entire_order)), createSQLErrorHandler(response));
    })

    app.use('/order/new', (request, response) => {
        request; // Surpress error message

        dbCreateNewOrder(dbConn).then(
            (new_order) => response.send(new_order),
            createSQLErrorHandler(response)
        )
    })




    // API endpoint for baseItems
    app.use('/baseItems', (request, response) => {
        request; // surpress error message

        dbGetItemTypes(dbConn)
            .then(itemTypes => itemTypes.filter((item) => item.is_pizza))
            .then(itemTypes => {
                response.send(itemTypes.map(({ item_display_name, itemtype_id }) => ({
                    item_display_name,
                    itemtype_id
                })))
            },
                createSQLErrorHandler(response))
    })

    app.use('/stocks/load', (request, response) => {
        request; // surpress error message

        dbGetStocks(dbConn).then((stocks) => {
            response.send(stocks)
        }, createSQLErrorHandler(response))
    })



    /*
    Example: http://zeta.ddns.net/stocks/update?stock_id=PP&stock_display_name=Pepperoni
    Updates a stock with the optional paramaters. 
    *HOWEVER*, stock_id is required
    Returns new stock JSON or an error

    Parameters:
        stock_id - the id of the dbGetStocks
        stock_display_name - (optional string) a new display name for this stock
        stock_amount - (optional number) the new stock amount for this stock
        stock_units - (optional string) the new stock units for this stock
        minimum_amount - (optional number) the new minimum amount for this stock

    Returns new JSON of stocks
    */
    app.use('/stocks/update', (request, response) => {
        request; // surpress error message

        const update_result = parseQuery(request.query as any, {
            stock_id: parseStockId, // Required param                
            stock_display_name: parseStringOptional,
            stock_amount: parseDoubleStrictOptional,
            stock_units: parseStringOptional,
            minimum_amount: parseDoubleStrictOptional,
        });

        const update_pairs = Object.entries(update_result).filter((([key, value]) => key != 'stock_id' && value != undefined))

        const update_list = update_pairs.map(([key, value]) => {
            return `${key} = ${escapeSQL(value)}`
        });


        const query = `UPDATE inventory SET ${update_list.join(', ')} WHERE stock_id = '${update_result.stock_id}';`
        dbConn.sqlUpdate(query).then(() => dbGetStocks(dbConn)).then((stocks) => {
            response.send(stocks)
        }, createSQLErrorHandler(response))
    })

    // Start hosting the server on PORT
    app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT}`)
        console.log(`Hosting ${REACT_APP_DIRECTORY}`)
    })
}

db.connect().then(startHosting, (err) => { console.log("Failed to connect to DB", err) })
