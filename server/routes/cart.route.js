import express from 'express';
import { isAuth } from '../middleware/isAuth.middleware.js';
import { addToCart, fetchCartItems, removeFromCart, updateCart } from '../controller/cart.controller.js';

const router = express.Router();

router.post('/cart/add', isAuth,addToCart)
router.get("/cart/remove/:id", isAuth, removeFromCart)
router.post("/cart/update", isAuth, updateCart)
router.get("/cart/all", isAuth, fetchCartItems)

export default router;