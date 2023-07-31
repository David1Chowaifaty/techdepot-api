import { Connection, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { AuthError } from "./AuthError";
import { readlink } from "fs";
interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  password: string;
}

export function Login(connection: Connection, email: string, password: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      async (error, result) => {
        if (error) {
          reject(error); // Reject with the original error object
        } else {
          const res = result as User[];
          if (res.length === 0) {
            reject(new AuthError("[Email-Error]: Invalid Email"));
          } else {
            const passwordMatch = await bcrypt.compare(
              password,
              res[0].password
            );
            if (passwordMatch) {
              resolve(res[0]);
            } else {
              reject(new AuthError("[Password-Error]: Invalid Password"));
            }
          }
        }
      }
    );
  });
}

export function Register(
  connection: Connection,
  email: string,
  password: string,
  firstname: string,
  lastname: string
) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (hashError, _hashedPassword) => {
      if (hashError) {
        reject(hashError);
      } else {
        connection.query(
          "INSERT INTO Users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)",
          [email, _hashedPassword, firstname, lastname],
          (error, result) => {
            if (error) {
              if (error.code === "ER_DUP_ENTRY") {
                reject(new AuthError("[Email-Error]=Email already exist"));
              } else {
                reject(error);
              }
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
}
