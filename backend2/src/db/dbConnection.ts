import { Client, Value } from 'ts-postgres';

const process = require('process')

export class dbConnection {
    constructor(private postgresClient: Client) {
        process.on('exit', () => {
            // Make it disconnect from the db on process exit
            // Not sure if this actually happens though
            postgresClient.end()
        })
    }

    /** Takes a SQL query, executes it on the postgreSQL database,
     * then returns the results as an array of JSON objects.
     * T is the TypeScript type of the JSON object
     * @param query the SQL query
     * @param queryArgs the parameters to the SQL query
     * @return an array of javascript {key:value} objects corresponding to the query
     */
    public sqlQuery<T extends {}>(query: string, queryArgs: Value[] = []) {
        return this.postgresClient.query(query, queryArgs).then((queryResult) => {
            const { names, rows } = queryResult
            return rows.map((row) => {
                let result: Record<string, any> = {}
                for (let name of names) {
                    result[name] = row.shift()
                }
                return result as T
            })
        })
    }

    /** Given an SQL update, returns an array of JSON objects from the query.
     * T is the TypeScript type of the JSON object
     * @param update the SQL update statement
     * @param updateArgs the parameters to the SQL query
     * @return an array of javascript {key:value} objects corresponding to the query
     */
    public sqlUpdate(update: string, updateArgs: Value[] = []) {
        return this.postgresClient.query(update, updateArgs)
    }
}