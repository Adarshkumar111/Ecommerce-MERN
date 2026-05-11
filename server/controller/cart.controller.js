import Cart from "../model/Cart.js";
import {Product} from "../model/Product.js";
import TryCatch from "../utils/TryCatch.js";

// add to cart

export const addToCart= TryCatch(async(req,res)=>{
    const {product}=req.body
    const cart= await Cart.findOne({
        product:product,
        user: req.user._id,
    }).populate('product')

    if(cart){
        if(cart.product.stock===cart.quantity){
            return res.status(400).json ({
                message:'Out of stock'
            })   
        }
        cart.quantity+=1;
        await cart.save();
        return res.status(200).json({
            message:'Added to cart',
            cart
        })
    }

    const cartProduct = await Product.findById(product);
    if(cartProduct.stock===0){
        return res.status(400).json ({
            message:'Out of stock'
        })   
    }
    await Cart.create({
        quantity:1,
        product,
        user:req.user._id
    })
    res.status(200).json({
        message:'Added to cart'
    })
})

// remove from cart

export const removeFromCart = TryCatch(async(req, res)=>{
    const cart=await Cart.findById(req.params.id);
    await cart.deleteOne();
    res.status(200).json({
        message:'Removed from cart'
    })
})

// update cart

export const updateCart = TryCatch(async(req, res)=>{
    const {action}=req.query;

    if(action==='inc'){
        const{id}=req.body;
        const cart=await Cart.findById(id).populate('product');
        if(cart.quantity<cart.product.stock){
            cart.quantity+=1;
            await cart.save();
        }
        else {
            return res.status(200).json({
                message:'Out of stock',
            })
        }
        res.json({
            message: "cart Updated"
        })
    }


    if(action==='dec'){
        const{id}=req.body;
        const cart=await Cart.findById(id).populate('product');
        if(cart.quantity>1){
            cart.quantity--;
            await cart.save();
        }
        else{
            return res.status(400).json({
                message: "you have only one item"
            })
        }
        res.json({
            message: "cart Updated"
        })
    }
})

// fetch cart items

export const fetchCartItems = TryCatch(async(req, res)=>{
    const cart= await Cart.find({user:req.user._id}).populate("product");

    const sumodQuantities=cart.reduce((total, item)=>total+item.quantity,0)

    let subTotal=0;
    cart.forEach((i)=>{
        const itemSubTotal=i.product.price*i.quantity;
        subTotal+=itemSubTotal;
    })

    res.json({
        cart,
        sumodQuantities,
        subTotal
    })
})