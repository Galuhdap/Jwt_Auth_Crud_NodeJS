import Express from "express";
import {
  getProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controller/Product.js";

const route = Express.Router();

route.get("/product" , getProduct);
route.get("/product/:id" , getProductById);
route.post("/product" , createProduct);
route.post("/product/:id" , updateProduct);
route.delete("/product/:id" , deleteProduct);

export default route;