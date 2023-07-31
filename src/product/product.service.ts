
import {Connection} from "mysql2"

export async function  GetAllCategories(connection:Connection):Promise<any>{
    return new Promise ((resolve, reject)=>{
        connection.query("Select distinct category from Product" , (err,res)=>{
            if(err){
                reject(err)
            }

        resolve(res)
        })
    })
    
}
export async function  GetSingleProduct(connection:Connection , id:number):Promise<any>{

    return new Promise ((resolve, reject)=>{
      connection.query("select * from Product where product_id = ?" , [id], (err,res)=>{
        if(err){
            reject(err)
        }
        resolve(res)
      })
    })
    
}
