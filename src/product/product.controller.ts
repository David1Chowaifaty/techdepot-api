import {Response , Request} from "express"
import {Connection} from "mysql2"
import { GetAllCategories, GetSingleProduct } from "./product.service";
import { ZodError, z } from "zod";

export async  function getAllCategories(req: Request,res: Response ){
    try {
        const connection:Connection = req.app.get("connection")
        let result = await GetAllCategories(connection);
        res.send(result)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
}

export async function getSingleProduct(req: Request ,res: Response){
    try {
        const productScheme = z.object({
            id:z.coerce.number()
        })
        let {id}= productScheme.parse(req.params)
        const connection:Connection = req.app.get("connection")
        let result = await GetSingleProduct(connection , id);
        res.send(result)
        
    } catch (error) {
        if(error instanceof ZodError){

            res.status(405).send(error)
        }
        res.status(500).send(error)
    }
}