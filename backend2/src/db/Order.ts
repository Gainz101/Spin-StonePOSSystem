import { SQL_Order, SQL_ID, SQL_TimeStamp } from "./sqlSchema";

export class Order implements SQL_Order {
    private constructor(
        public order_id: SQL_ID, 
        public creation_time: SQL_TimeStamp,
        public completed: boolean
    ) { }
}