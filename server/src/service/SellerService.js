import Address from "../model/Address.model";
import Seller from "../model/seller.model.js";
import { getEmailFromJwt } from "../utils/jwtProvider.js";

// create seller

export const createSeller= async (sellerData)=>{
    const existingSeller= await Seller.findOne({email:sellerData.email});
    if(existingSeller){
        throw new Error("Seller already exists");
    }

    let saveAddress=sellerData.pickupAddress;
    saveAddress=await Address.create(sellerData.pickupAddress)
    const newSeller=new Seller({
        sellerName:sellerData.name,
        email:sellerData.email,
        mobile:sellerData.mobile,
        password:sellerData.password,
        busineussDetails:sellerData.businessDetails,
        bankDetails:sellerData.bankDetails,
        pickupAddress:saveAddress._id,
        GSTIN:sellerData.GSTIN,
        
    })

    return await newSeller.save();

}

// seller profile
export const getSellerProfile = async (jwt) => {
    const email=getEmailFromJwt(jwt);
    return getSellerByEmail(email);
};

// get seller by email
export const getSellerByEmail = async (email) => {
    const seller = await Seller.findOne({ email });

    if (!seller) {
        throw new Error("Seller not found");
    }

    return seller;
};

// get seller by id

export const getSellerById= async (id)=>{
    const seller=await Seller.findById(id);
    if(!seller){
        throw new Error("Seller not found");
    }
    return seller;
}


// get all sellers

export const getAllSellers=async(status)=>{
    return  await Seller.find({accountStatus:status})
}

// update seller
export const updateSeller=async(existingSeller, updateData)=>{
    return await Seller.findByIdAndUpdate(existingSeller._id, sellerData, {new:true})
}

// update seller status
export const updateSellerStatus=async(sellerId, status)=>{
    return await Seller.findByIdAndUpdate(sellerId, {$set:{accountStatus:status}}, {new:true})
}

// delete seller

export const deleteSeller=async(sellerId)=>{
    return await Seller.findByIdAndDelete(sellerId)

}