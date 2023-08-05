import { Response, Request } from "express";
import { Connection } from "mysql2";
import {
  AddProduct,
  DeleteProduct,
  GetAllCategories,
  GetAllProducts,
  GetProductByCategoryAndPrice,
  GetSingleProduct,
  RateAProduct,
  UpdateProduct,
} from "./product.service";
import { ZodError, z } from "zod";

export async function getAllCategories(req: Request, res: Response) {
  try {
    const connection: Connection = req.app.get("connection");
    let result = await GetAllCategories(connection);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const productScheme = z.object({
      id: z.coerce.number(),
    });
    let { id } = productScheme.parse(req.params);
    const connection: Connection = req.app.get("connection");
    let result = await GetSingleProduct(connection, id);
    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    }
    res.status(500).send(error);
  }
}

export async function getProductByCategoryAndPrice(
  req: Request,
  res: Response
) {
  try {
    const productScheme = z.object({
      category: z.string(),
      price: z.coerce.number(),
    });
    let { category, price } = productScheme.parse(req.params);
    const connection: Connection = req.app.get("connection");
    const result = await GetProductByCategoryAndPrice(
      connection,
      category,
      price
    );

    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    }
    res.status(500).send(error);
  }
}
export async function getAllProducts(req: Request, res: Response) {
  try {
    const productScheme = z.object({
      limit: z.coerce.number(),
      offset: z.coerce.number(),
    });
    let { limit, offset } = productScheme.parse(req.params);
    const connection: Connection = req.app.get("connection");
    const result = await GetAllProducts(connection, limit, offset);

    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    }
    res.status(500).send(error);
  }
}
export async function rateAProduct(req: Request, res: Response) {
  try {
    const productScheme = z.object({
      user_id: z.coerce.number(),
      product_id: z.coerce.number(),
      rating: z.coerce.number(),
    });
    let { user_id, product_id, rating } = productScheme.parse(req.body);
    if (rating > 5 || rating < 1) {
      res.status(400).send("Invalid rating");
    }

    const connection: Connection = req.app.get("connection");
    const result = await RateAProduct(connection, user_id, product_id, rating);
    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    }
    res.status(500).send(error);
  }
}

export async function addProduct(req: Request, res: Response) {
  try {
    const productSheme = z.object({
      quantity: z.coerce.number(),
      category: z.string(),
      price: z.coerce.number(),
      discount: z.coerce.number(),
      product_name: z.string(),
    });

    let { quantity, category, price, discount, product_name } =
      productSheme.parse(req.body);

    const connection: Connection = req.app.get("connection");

    const result = await AddProduct(
      connection,
      quantity,
      category,
      price,
      discount,
      product_name
    );
    res.send("sucess");
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    }
    res.status(500).send(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const product_scheme = z.object({
      product_id: z.coerce.number(),
    });
    let { product_id } = product_scheme.parse(req.params);
    const connection: Connection = req.app.get("connection");
    const result = await DeleteProduct(connection, product_id);
    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    } else {
      res.status(500).send(error);
    }
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const productSheme = z.object({
      product_id: z.coerce.number(),
      quantity: z.coerce.number(),
      category: z.string(),
      price: z.coerce.number(),
      discount: z.coerce.number(),
      product_name: z.string(),
    });
    let { product_id, quantity, category, price, discount, product_name } =
      productSheme.parse(req.body);
    const connection: Connection = req.app.get("connection");
    const result = await UpdateProduct(
      connection,
      product_id,
      quantity,
      category,
      price,
      discount,
      product_name
    );
    res.send(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(405).send(error);
    } else {
      res.status(500).send(error);
    }
  }
}
