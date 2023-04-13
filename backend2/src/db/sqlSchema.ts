type SQL_ID = number
type SQL_TimeStamp = string


interface SQL_Order_ID {
    order_id: SQL_ID;
}

interface SQL_Order extends SQL_Order_ID {
    creation_time: SQL_TimeStamp;
    completed: boolean;
}

interface SQL_ItemType {
    itemtype_id: SQL_ID;
    item_display_name: string;
    item_price: number;
    is_modifier: boolean;
    is_pizza: boolean;
    min_toppings: number;
    max_toppings: number;
}

interface SQL_WrapperClass<T extends {}> {
    raw_data: T
}

export {SQL_ID, SQL_TimeStamp, SQL_Order, SQL_ItemType, SQL_WrapperClass }