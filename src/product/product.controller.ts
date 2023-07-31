import {Response , Request} from "express"
import {Connection} from "mysql2"
import { GetAllCategories, GetProductByCategory, GetProductByCategoryAndPrice, GetSingleProduct } from "./product.service";
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

export async function getProductByCategory (req: Request ,res: Response){
    try {
        const productScheme = z.object({
            category : z.string()
        })
        let {category}=productScheme.parse(req.params)
        const connection :Connection = req.app.get("connection")
        const result = await GetProductByCategory(connection , category)
        res.send(result)
        
    } catch (error) {
        if(error instanceof ZodError){

            res.status(405).send(error)
        }
        res.status(500).send(error)
        
    }
}

export async function getProductByCategoryAndPrice (req: Request ,res: Response){
    try {
        const productScheme = z.object({
            category : z.string(),
            price:z.coerce.number()
        })
        let {category , price}=productScheme.parse(req.params)
        const connection :Connection = req.app.get("connection")
        const result = await GetProductByCategoryAndPrice(connection , category , price)
    
        res.send(result)
    
        
    } catch (error) {
        if(error instanceof ZodError){

            res.status(405).send(error)
        }
        res.status(500).send(error)
        
    }
}
