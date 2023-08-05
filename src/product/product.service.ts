import { error } from "console";
import { Connection } from "mysql2";

export interface Rating {
  counter: number;
}

export async function GetAllCategories(connection: Connection): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query("Select distinct category from Product", (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
}
export async function GetAllProducts(
  connection: Connection,
  limit: number,
  offset: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      "Select * from Product LIMIT ? OFFSET ?",
      [limit, offset],
      (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      }
    );
  });
}
export async function GetSingleProduct(
  connection: Connection,
  id: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      "select * from Product where product_id = ?",
      [id],
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
}

export async function GetProductByCategoryAndPrice(
  connection: Connection,
  category: string,
  price: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      `Select p.* , Cast(COALESCE(AVG(r.rating), 0) as Float) as rating 
      from Product p 
      Left JOIN  Rating r  On r.product_id = p.product_id
      where category=? And price < ? 
      group by product_id ; `,
      [category, price],
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });
}
export async function RateAProduct(
  connection: Connection,
  user_id: number,
  product_id: number,
  rating: number
) {
  return new Promise((resolve, reject) => {
    connection.query(
      "Select Count(*) as counter from Rating where user_id= ? And product_id = ?",
      [user_id, product_id],
      (selectError, selectResult) => {
        if (selectError) {
          console.log(selectError);
          reject(selectError);
        } else {
          const res = selectResult as Rating[];

          if (res[0].counter === 0) {
            connection.query(
              "insert into Rating (user_id , product_id ,rating) values (?,?,?)",
              [user_id, product_id, rating],
              (error, result) => {
                if (error) {
                  console.log(error);
                  reject(error);
                }
                resolve("success");
              }
            );
          } else {
            connection.query(
              "update  Rating  set  rating=? where user_id = ? and product_id=?",
              [rating, user_id, product_id],
              (error, result) => {
                if (error) {
                  console.log(error);
                  reject(error);
                }
                resolve("success");
              }
            );
          }
        }
      }
    );
  });
}

export async function AddProduct(
  connection: Connection,
  quantity: number,
  category: string,
  price: number,
  discount: number,
  product_name: string
) {
  return new Promise((resolve, reject) => {
    connection.query(
      "insert into Product (quantity , category , price , discount ,product_name ) values (?,?,?,?,?)",
      [quantity, category, price, discount, product_name],
      (error, _) => {
        if (error) {
          reject(error);
        }
        resolve("success");
      }
    );
  });
}

export async function DeleteProduct(
  connection: Connection,
  product_id: number
) {
  return new Promise((resolve, reject) => {
    connection.query(
      "Delete from Product where product_id =?",
      [product_id],
      (error, _) => {
        if (error) {
          reject(error);
        }
        resolve("sucess");
      }
    );
  });
}

export async function UpdateProduct(
  connection: Connection,
  product_id: number,
  quantity: number,
  category: string,
  price: number,
  discount: number,
  product_name: string
) {
  return new Promise((resolve, reject) => {
    connection.query(
      `update Product
     set quantity= ?  , category= ? , price = ?  ,  discount = ? , product_name = ? 
     where product_id = ?`,
      [quantity, category, price, discount, product_name, product_id],
      (error, _) => {
        if (error) {
          reject(error);
        }
        resolve("success");
      }
    );
  });
}
