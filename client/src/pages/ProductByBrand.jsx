import React, { useEffect } from 'react'
import ProductList from '../components/product/ProductList'
import Layout from '../components/layout/Layout'
import ProductStore from '../store/ProductStore'
import { useParams } from 'react-router-dom'

const ProductByBrand = () => {

  const { ListByBrandRequest, ListByBrand } = ProductStore()
  const { id } = useParams()

  useEffect(() => {
    (async () => {
      try {
        await ListByBrandRequest(id)
      } catch (error) {
        console.error('Error fetching product by brand:', error);
      }
    })();
  }, [id])

  return (
    <>
      <Layout>
        <ProductList data={ListByBrand} />
      </Layout>
    </>
  )
}

export default ProductByBrand