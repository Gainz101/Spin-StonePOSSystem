import { SQL_ID, SQL_ItemType, SQL_WrapperClass } from './sqlSchema'
import { dbConnection } from './dbConnection'

export class ItemType implements SQL_WrapperClass<SQL_ItemType> {
    public constructor(
        public raw_data: SQL_ItemType
    ) {
    }
    public static async getItemTypes(dbConn: dbConnection, cached:boolean = false) {
        return (await dbConn.sqlQuery<SQL_ItemType>(`SELECT * FROM itemtypes;`))
    }
}