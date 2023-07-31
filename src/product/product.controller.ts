import {Response , Request} from "express"
import {Connection} from "mysql2"
import { GetAllCategories } from "./product.service";

export async  function getAllCategories(req: Request,res: Response ){
    try {
        const connection:Connection = req.app.get("connection")
        let result = await GetAllCategories(connection);
        res.send(result)
        
    } catch (error) {
        res.send(Error)
        
    }
}