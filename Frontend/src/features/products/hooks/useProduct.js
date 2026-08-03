import CreateProduct from "../service/product.api.js";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../state/product.slice.js";


const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProduct = async (formData) => {
    try {
      const response = await CreateProduct(formData);
      return response.product;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return { handleCreateProduct };
};

export default useProduct;
