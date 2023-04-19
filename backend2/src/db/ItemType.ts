import { SQL_ItemType } from './SQL_Schema'
import { dbConnection } from './dbConnection'

export async function dbGetItemTypes(dbConn: dbConnection) {
    return (await dbConn.sqlQuery<SQL_ItemType>(`SELECT * FROM itemtypes;`))
}