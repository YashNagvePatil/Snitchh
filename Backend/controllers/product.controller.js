import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


 export async function createProduct(req,res){
    try{ 
          const {title,description,priceAmount,priceCurrency} = req.body    
          const seller = req.user;
         
          if(!req.files || req.files.length === 0)
          {
            return res.status(400).json({
                success:false,
                message:"at least one product image is required"
            })

          }
  
              const images = await Promise.all(req.files.map(async (file) => {
                    return await  uploadFile({buffer:file.buffer,fileName:file.originalname
 
                 })
              }))
          
        

            
  



    const product = await productModel.create({
        title,
        description, 
        price:{
            amount:priceAmount,
            currency:priceCurrency || "INR"
        },
        seller:seller._id,
        image:images
    }) 
    
     res.status(201).json({
        success:true,
        product
         })
      }  
   
  
     catch (error){
        console.log("Error in createProduct controller:",error)
             return res.status(500).json({
            message:error.message || "Internal Server Error",           
        })
     }
   } 

   export async function getSellerProducts(req,res) {
    const seller = req.user;

    const products = await productModel.find({seller:seller._id})

     res.status(200).json({
        message:"Products fetched succesfully",
        success:true,
        products
     })
   }



   export async function getProductDetails(req,res){
        
       const {id} = req.params;
  
       const product = await productModel.findById(id)

       if(!product) {
        return res.status(404).json({
            message:"Product not found",
            success:false
        })
       }

       return res.status(200).json({
            message:"Product details fetched succesfully",
            success:true,
            product
        })
       }

       
   export async function getAllProducts(req,res){


    const products = await productModel.find()

    return res.status(200).json({
        message:"Products fetched succesfully",
        success:true,
        products
    })
   }
   
 







 