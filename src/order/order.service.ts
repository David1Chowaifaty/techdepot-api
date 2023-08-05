import { Connection } from "mysql2";
export async function GetAllOrders(connection: Connection) {
  connection.query(`
        SELECT o.*,op.quantity as product_amount,p.*
        FROM Orders o
        JOIN Orders_Product op ON op.order_id=o.order_id
        JOIN Product p on p.product_id=op.product_id
        GROUP BY op.order_id
    `);
}
