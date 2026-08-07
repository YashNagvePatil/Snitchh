import {createProduct,getSellerProduct,getAllProducts} from "../service/product.api.js";
import { useDispatch } from "react-redux";
import { setSellerProducts,setProducts } from "../state/product.slice.js";


const useProduct = () => {
  
    const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      const response = await createProduct(formData);
      return response.product;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };


  async function handleGetSellerProduct(){
        const data  = await getSellerProduct()
 
        dispatch(setSellerProducts(data.products))

        return data.products


  }

  async function handleGetAllproducts() {
       const data = await getAllProducts()
       dispatch(setProducts(data.products))
      
  }



  return { handleCreateProduct,handleGetSellerProduct,handleGetAllproducts};
};

export default useProduct;
