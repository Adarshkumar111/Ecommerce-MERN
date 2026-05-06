import { Product } from "../model/Product.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary"

export const createProduct = TryCatch(async(req, res)=>{
    if(req.user.role !=="admin") return res.status(403).json({
        message: "You are not  admin"
    })

    const {title, about, category, price, stock}=req.body

    const files= req.files


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
        about,
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

// get all products
export const getAllProducts= TryCatch(async(req, res)=>{
    const {search, category, page, sortByPrice}=req.query;

    const filter={};

    if(search){
        filter.title={
            $regex: search,
            $options:"i",
        };
    }
    if(category){
        filter.category=category;
    }

    const limit=8;
    const skip=(page - 1) * limit;
    let sortOptions={createdAt: -1}
    if(sortByPrice){
        if(sortByPrice === "lowToHigh"){
            sortOptions={price:1}
        }
        else if(sortByPrice === "highToLow"){
            sortOptions={price: -1}
        }
    }

    const products = await Product.find(filter)
  .sort(sortOptions)
  .limit(limit)
  .skip(skip);

    const categories= await Product.distinct("category");

    const newProduct= await Product.find().sort("-createdAt").limit(8);

    const countProduct = await Product.countDocuments()

    const totalPages = Math.ceil(countProduct/limit)

    res.status(200).json({
        products,
        categories,
        newProduct,
        totalPages
    })

})