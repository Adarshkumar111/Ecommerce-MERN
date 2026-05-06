import express from 'express';
import { isAuth } from '../middleware/isAuth.middleware.js';
import { createProduct, getAllProducts } from '../controller/product.controller.js';
import uploadFiles from '../middleware/multer.middleware.js';

const router = express.Router();


router.post("/product/new", isAuth,uploadFiles, createProduct)
router.get("/product/all", getAllProducts)

export default router;

//14 min lec 4