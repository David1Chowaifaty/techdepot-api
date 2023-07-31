
import {Connection} from "mysql2"

export async function  GetAllCategories(connection:Connection):Promise<any>{
    return new Promise ((resolve, reject)=>{
        connection.query("Select distinct category from Product" , (err: Error,res: Response)=>{
            if(err){
                reject(err)
            }

        resolve(res)
        })
    })
    
}