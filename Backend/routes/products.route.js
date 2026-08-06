import express from "express";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct, getAllProducts, getSellerProducts} from "../controllers/product.controller.js";

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:5 * 1024 * 1024}, // 5MB
 })

  const router = express.Router();

  /**
   * @route POST /api/products/
   * @description create a new product
   * @access private
   */

  router.post("/",authenticateSeller,upload.array("images",7),createProductValidator,createProduct)


  /***
   * @route GET /api/products/seller
   * @description get all products
   * @access private(seller only)
   */
  router.get("/seller",authenticateSeller,getSellerProducts)
 
  /**
   * @route GET /api/products
   * @description Get all products
   * @access Public
   */

  router.get("/",getAllProducts)




  export default router;