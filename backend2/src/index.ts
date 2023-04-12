/**
 * index.ts - Entrypoint for backend server
 */

// Module imports
import express from 'express';
import db from './db/index'
import { dbConnection } from './db/dbConnection';
import { ItemType } from './db/ItemType'


// Constants
const REACT_APP_DIRECTORY : string = '../build'
const PORT : number = 5001

// Express module
function startHosting(dbConn: dbConnection) {
    const app = express();
    // Serve the static react app (html, js, css)
    app.use('/', express.static(REACT_APP_DIRECTORY))

    // API endpoint for ItemTypes
    app.use('/itemTypes', (request, response)=>{
        request; // surpress error message

        // https://web.dev/cross-origin-resource-sharing/
        response.setHeader('Access-Control-Allow-Origin', '*')

        ItemType.dbGetItemTypes(dbConn)
            .then(itemTypes=>response.send(itemTypes))
    })

    // API endpoint for baseItems
    app.use('/baseItems', (request, response)=>{
        request; // surpress error message

        // https://web.dev/cross-origin-resource-sharing/
        response.setHeader('Access-Control-Allow-Origin', '*')

        ItemType.dbGetItemTypes(dbConn)
            .then(itemTypes=>itemTypes.filter((item)=>item.is_pizza))
            .then(itemTypes=>{
                response.send(itemTypes.map(({item_display_name, itemtype_id})=>({
                    item_display_name,
                    itemtype_id
                })))
            })
    })

    // Start hosting the server on PORT
    app.listen(PORT, ()=>{
        console.log(`Backend server started on port ${PORT}`)
        console.log(`Hosting ${REACT_APP_DIRECTORY}`)
    })
}

db.connect().then(startHosting, (err)=>{ console.log("Failed to connect to DB", err)})
