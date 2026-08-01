import express from "express";
import multer from "multer";


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

  router.post("/",authenticateSeller,upload.array("images",7),createProduct)