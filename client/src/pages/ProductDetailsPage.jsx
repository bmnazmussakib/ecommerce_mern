import React, { useEffect } from 'react'
import Details from '../components/product/Details'
import Layout from '../components/layout/Layout'
import { useParams } from 'react-router-dom'
import ProductStore from '../store/ProductStore'
import Brands from '../components/product/Brands'

const ProductDetailsPage = () => {

  const { id } = useParams()
  const { DetailsRequest, ReviewListRequest, BrandListRequest, BrandList } = ProductStore()

  useEffect(() => {
    (async ()=>{
      await DetailsRequest(id)
      await ReviewListRequest(id)
      BrandList === null ? await BrandListRequest() : null
    })()
  }, [id])

  return (
    <Layout>
      <Details />
      <Brands />
    </Layout>
  )
}

export default ProductDetailsPage