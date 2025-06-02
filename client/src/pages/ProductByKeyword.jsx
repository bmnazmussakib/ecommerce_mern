import React, { useEffect } from 'react'
import ProductList from '../components/product/ProductList'
import Layout from '../components/layout/Layout'
import ProductStore from '../store/ProductStore'
import { useParams } from 'react-router-dom'

const ProductByKeyword = () => {

  const { ListByKeyword, ListByKeywordRequest } = ProductStore()
  const { keyword } = useParams()

  useEffect(() => {
    (async () => {
      try {
        await ListByKeywordRequest(keyword)
      } catch (error) {
        console.error('Error fetching product by brand:', error);
      }
    })();
  }, [keyword])

  return (
    <>
      <Layout>
        <ProductList data={ListByKeyword} />
      </Layout>
    </>
  )
}

export default ProductByKeyword