import mongoose from "mongoose";
import UserRoles from "../domain/UserRole.js";

const sellerSchema=new mongoose.Schema({
    sellerName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        typr:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    busineussDetails:{
        businessName:{
            type:String,
        },
        businessEmail:{
            type:String,
        },
        businessMobile:{
            type:String,
        },
        businessAddress:{
            type:String,
        }
    },
    bankDetails:{
        accountNumber:{
            type:String,
        },
        accountHolderName:{
            type:String,
        },
        bankName:{
            type:String,
        },
        ifscCode:{
            type:String,
        },
    },
    pickupAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    GSTIN:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:[UserRoles.SELLER],
        default:UserRoles.SELLER
    },
    acccountStatus:{
       type: String,
        enum: [AccountStatus.PENDING_VERIFICATION,
            AccountStatus.ACTIVE,
            AccountStatus. SUSPENDED,
            AccountStatus. DEACTIVATED,
            AccountStatus. BANNED,
            AccountStatus.CLOSED],
        default: "ACTIVE"
    }

}, {timestamps:true})

const Seller=mongoose.model("Seller", sellerSchema)

export default Seller;