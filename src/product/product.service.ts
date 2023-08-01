
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





export async function  GetProductByCategoryAndPrice(connection:Connection , category:string , price :number):Promise<any>{

    return new Promise ((resolve, reject)=>{
      connection.query(`Select p.* , Cast(COALESCE(AVG(r.rating), 0) as Float) as rating 
      from Product p 
      Left JOIN  Rating r  On r.product_id = p.product_id
      where category=? And price < ? 
      group by product_id ; ` , [category, price], (err,res)=>{
        if(err){
            reject(err)
        }
        resolve(res)
      })
    })
    
}


