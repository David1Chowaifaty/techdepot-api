import { Connection } from "mysql2";
import { FavoriteError } from "./favoriteError";

interface FavoriteProduct {
  counter: number;
}
export function AddToFavorite(
  connection: Connection,
  user_id: number,
  product_id: number
) {
  return new Promise((resolve, reject) => {
    connection.query(
      `
    SELECT COUNT(*) AS counter
    FROM Favorite
    WHERE user_id=? and product_id=?`,
      [user_id, product_id],
      (selectError, selectResult) => {
        {
          if (selectError) {
            reject(selectError);
          } else {
            const res = selectResult as FavoriteProduct[];
            if (res[0].counter === 0) {
              connection.query(
                "INSERT INTO Favorite (user_id,product_id) VALUES(?,?)",
                [user_id, product_id],
                (error, _) => {
                  if (error) {
                    reject(error);
                  }
                  resolve("success");
                }
              );
            } else {
              reject(new FavoriteError("Product Already Exist"));
            }
          }
        }
      }
    );
  });
}
export function RemoveFromFavorite(
  connection: Connection,
  favorite_id: number
) {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM Favorite WHERE favorite_id=?",
      [favorite_id],
      (error, _) => {
        if (error) {
          reject(error);
        }
        resolve("success");
      }
    );
  });
}

export function GetAllFavorite(connection: Connection, user_id: number) {
  return new Promise((resolve, reject) => {
    connection.query(
      `
        SELECT p.* 
        FROM Product p
        JOIN Favorite f on f.product_id =p.product_id
        where f.user_id=?; 
        `,
      [user_id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
}
