"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_postgres_1 = require("ts-postgres");
const dbConnection_1 = require("./dbConnection");
class db {
    static connect() {
        const client = new ts_postgres_1.Client({
            host: "csce-315-db.engr.tamu.edu",
            database: "csce315331_zeta",
            user: "csce315331_zeta_master",
            password: "zeta",
            port: 5432,
            ssl: "disable" /* SSLMode.Disable */ // <--- this is really really bad, we aren't encrypted when talking to the server
        });
        //  
        return client.connect().then(() => {
            return new dbConnection_1.dbConnection(client);
        });
    }
}
exports.default = db;
//# sourceMappingURL=index.js.map