import React from 'react'
import { useParams } from 'react-router'

const ProductsDetails = () => {

  const{ productId } = useParams()
 
  console.log(productId)
  return (
    <div>ProductsDetails</div>
  )
}

export default ProductsDetails