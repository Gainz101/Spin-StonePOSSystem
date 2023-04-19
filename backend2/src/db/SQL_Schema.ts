export type SQL_ID = number
export type SQL_TimeStamp = string


export interface SQL_OrderReference {
    order_id: SQL_ID;
}

export interface SQL_Order extends SQL_OrderReference {
    creation_time: SQL_TimeStamp;
    completed: boolean;
}

export interface SQL_ItemType {
    itemtype_id: SQL_ID;
    item_display_name: string;
    item_price: number;
    is_modifier: boolean;
    is_pizza: boolean;
    min_toppings: number;
    max_toppings: number;
}

export interface SQL_ItemReference {
    item_id: SQL_ID
}

export interface SQL_Item extends SQL_ItemReference {
    itemtype_id: SQL_ID,
    root_item_id: SQL_ID,
}