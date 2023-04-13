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
    public async generateNewOrderId() {
        return (await this.sqlQuery<{ new_order_id: number }>
            (`SELECT MAX(order_id)+1 AS new_order_id FROM orders`))[0].new_order_id
    }
}