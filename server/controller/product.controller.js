import { Product } from "../model/Product.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary"

export const createProduct = TryCatch(async(req, res)=>{
    if(req.user.role !=="admin") return res.status(403).json({
        message: "You are not  admin"
    })

    const {title, description, category, price, stock}=req.body

    const file= req.files


    if(!files || files.length === 0) return res.status(400).json({
        message:"Please upload at least one image"
    })

    const imagesUploadPromises = files.map(async(file)=>{
        const fileBuffer = bufferGenerator(file)

        const result =await cloudinary.v2.uploader.upload(fileBuffer.content)

        return {
            id: result.public_id,
            url: result.secure_url,
        };
    })

    const uploadImage = await Promise.all(imagesUploadPromises)

    const product =  await Product.create({
        title,
        description,
        category,
        price,
        stock,
        images: uploadImage
    })

    res.status(201).json({
        message:"Product created successfully",
        product
    })
})