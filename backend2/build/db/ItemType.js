"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbGetItemTypes = void 0;
async function dbGetItemTypes(dbConn) {
    return (await dbConn.sqlQuery(`SELECT * FROM itemtypes;`));
}
exports.dbGetItemTypes = dbGetItemTypes;
//# sourceMappingURL=ItemType.js.map