"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const process = require('process');
class dbConnection {
    constructor(postgresClient) {
        this.postgresClient = postgresClient;
        process.on('exit', () => {
            // Make it disconnect from the db on process exit
            // Not sure if this actually happens though
            postgresClient.end();
        });
    }
    /** Takes a SQL query, executes it on the postgreSQL database,
     * then returns the results as an array of JSON objects.
     * T is the TypeScript type of the JSON object
     * @param query the SQL query
     * @param queryArgs the parameters to the SQL query
     * @return an array of javascript {key:value} objects corresponding to the query
     */
    sqlQuery(query, queryArgs = []) {
        return this.postgresClient.query(query, queryArgs).then((queryResult) => {
            const { names, rows } = queryResult;
            return rows.map((row) => {
                let result = {};
                for (let name of names) {
                    result[name] = row.shift();
                }
                return result;
            });
        });
    }
    /** Given an SQL update, returns an array of JSON objects from the query.
     * T is the TypeScript type of the JSON object
     * @param update the SQL update statement
     * @param updateArgs the parameters to the SQL query
     * @return an array of javascript {key:value} objects corresponding to the query
     */
    sqlUpdate(update, updateArgs = []) {
        return this.postgresClient.query(update, updateArgs);
    }
}
exports.dbConnection = dbConnection;
//# sourceMappingURL=dbConnection.js.map