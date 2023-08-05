"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllFavorite = exports.RemoveFromFavorite = exports.AddToFavorite = void 0;
var favoriteError_1 = require("./favoriteError");
function AddToFavorite(connection, user_id, product_id) {
    return new Promise(function (resolve, reject) {
        connection.query("\n    SELECT COUNT(*) AS counter\n    FROM Favorite\n    WHERE user_id=? and product_id=?", [user_id, product_id], function (selectError, selectResult) {
            {
                if (selectError) {
                    reject(selectError);
                }
                else {
                    var res = selectResult;
                    if (res[0].counter === 0) {
                        connection.query("INSERT INTO Favorite (user_id,product_id) VALUES(?,?)", [user_id, product_id], function (error, _) {
                            if (error) {
                                reject(error);
                            }
                            resolve("success");
                        });
                    }
                    else {
                        reject(new favoriteError_1.FavoriteError("Product Already Exist"));
                    }
                }
            }
        });
    });
}
exports.AddToFavorite = AddToFavorite;
function RemoveFromFavorite(connection, favorite_id) {
    return new Promise(function (resolve, reject) {
        connection.query("DELETE FROM Favorite WHERE favorite_id=?", [favorite_id], function (error, _) {
            if (error) {
                reject(error);
            }
            resolve("success");
        });
    });
}
exports.RemoveFromFavorite = RemoveFromFavorite;
function GetAllFavorite(connection, user_id) {
    return new Promise(function (resolve, reject) {
        connection.query("\n        SELECT p.* \n        FROM Product p\n        JOIN Favorite f on f.product_id =p.product_id\n        where f.user_id=?; \n        ", [user_id], function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
}
exports.GetAllFavorite = GetAllFavorite;
