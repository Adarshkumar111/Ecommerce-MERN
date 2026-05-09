import express from 'express';
import { isAuth } from '../middleware/isAuth.middleware.js';
import { createProduct, getAllProducts, getSingleProduct, updateProduct, updateProductImage } from '../controller/product.controller.js';
import uploadFiles from '../middleware/multer.middleware.js';

const router = express.Router();


router.post("/product/new", isAuth,uploadFiles, createProduct)
router.get("/product/all", getAllProducts)
router.get("/product/:id", getSingleProduct)
router.put("/product/:id",isAuth, updateProduct)
router.post("/product/:id",isAuth,uploadFiles, updateProductImage)


export default router;

