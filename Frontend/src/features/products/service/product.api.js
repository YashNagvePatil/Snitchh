import axios from "axios";

const productApi = axios.create({
    baseURL:"http://localhost:3000/api/products",
    withCredentials:true
})

export async function createProduct(formData){
    const response = await productApi.post("/",formData)

    return response.data
}

export async function getSellerProduct() {
    const response = await productApi.get("/seller")
    return response.data
    
}


export async function getAllProducts() {
      const response = await productApi.get("/")
      return response.data
}

export async function addProductVariant(productId,newProductVarient){
    const formData = new formData()

    newProductVarient.images.foreach((image) => {
        formData.append(`image`,image.file)
    })

    formData.append("stock",newProductVarient.stock)
    formData.append("priceAmount",newProductVarient.price.amount)
    formData.append("attributes",JSON.stringify(newProductVarient.price.amount))

    const response = await productApi.post(`/${productId}/variants`,formData)
   
    return response.data
}
