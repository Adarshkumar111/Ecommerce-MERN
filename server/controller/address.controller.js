import { Address } from "../model/Address.js";
import TryCatch from "../utils/TryCatch.js";


export const addAddress=TryCatch(async(req,res)=>{
    const {address,phone}=req.body;

    await Address.create({
        address,
        phone,
        user:req.user._id,
    })
    
    res.status(200).json({
        success:true,
        message:"Address added successfully"
    })
})

// get all address of user

export const getAllAddress=TryCatch(async(req,res)=>{
    const allAddress= await Address.find({user:req.user._id});
    res.json(allAddress)
})

// get single address of user

export const getSingleAddress=TryCatch(async(req,res)=>{
    const address = await Address.findById(req.params.id);

    res.json(address)

});

// delete address of user

export const deleteAddress=TryCatch(async(req, res)=>{
    const address=await Address.findOne({
        _id:req.params.id,
        user:req.user._id,
    })

    await address.deleteOne()
    res.json({
        message:"Address deleted successfully"
    })
})
