/**
 * index.ts - Entrypoint for backend server
 */

// Module imports
import express from 'express';
import db from './db/index'
import { dbConnection } from './db/dbConnection';
import { dbGetItemTypes } from './db/ItemType'
import { dbAddItemToOrder, dbCompleteOrder, dbCreateNewOrder, dbGetEntireOrder, dbRemoveItemFromOrder } from './db/Order';


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

function parseIntStrict(str: string): number {
    const result = parseInt(Number(str).toString())
    if (Number.isNaN(result)) {
        throw `expected an integer, got "${str}"`
    }
    return result;
}

const parseIntStrictOptional = createOptionalParser(parseIntStrict);

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

    returns new order
    */
    app.use('/order/addItem', (request, response) => {
        const { order_id,
            itemtype_id,
            root_item_id } = parseQuery(request.query as any, {
                order_id: parseIntStrict, // Required param
                itemtype_id: parseIntStrict, // Required param
                root_item_id: parseIntStrictOptional // Optional
            });

        dbAddItemToOrder(dbConn, order_id, itemtype_id, root_item_id)
            .then(
                () => dbGetEntireOrder(dbConn, order_id).then(entire_order => response.send(entire_order)),
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

    app.use('/order/complete', (request, response)=>{
        const { order_id } = parseQuery(request.query as any, {
            order_id: parseIntStrict, // Required param                
        });

        dbCompleteOrder(dbConn, order_id)
            .then(()=>dbGetEntireOrder(dbConn, order_id).then(entire_order => response.send(entire_order)), createSQLErrorHandler(response));
    })

    app.use('/order/new', (request, response)=>{
        dbCreateNewOrder(dbConn).then(
            (new_order)=>response.send(new_order),
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

    // Start hosting the server on PORT
    app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT}`)
        console.log(`Hosting ${REACT_APP_DIRECTORY}`)
    })
}

db.connect().then(startHosting, (err) => { console.log("Failed to connect to DB", err) })
