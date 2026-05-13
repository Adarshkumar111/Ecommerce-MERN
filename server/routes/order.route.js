import express from 'express';
import { isAuth } from '../middleware/isAuth.middleware.js';
import { getAllOrders, getAllOrdersAdmin, getOrder, getStats, newOrderCod, updateStatus } from '../controller/order.controller.js';

const router = express.Router();

router.post('/order/new/cod', isAuth, newOrderCod)
router.get("/order/all", isAuth,getAllOrders)
router.get("/order/admin/all", isAuth,getAllOrdersAdmin)
router.get("/order/:id", isAuth, getOrder)
router.post("/order/:id", isAuth, updateStatus)
router.get("/stats", isAuth, getStats)


export default router;