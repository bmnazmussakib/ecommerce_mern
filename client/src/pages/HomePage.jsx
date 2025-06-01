import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import SliderSkeleton from '../skeleton/SliderSkeleton'
import FeaturesSkeleton from '../skeleton/FeaturesSkeleton'
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton'
import ProductsSekeleton from '../skeleton/ProductsSekeleton'
import BrandsSkeleton from '../skeleton/BrandsSkeleton'

import ProductStore from '../store/ProductStore'
import FeatureStore from '../store/FeatureStore'

import Slider from '../components/product/Slider'
import Features from '../components/features/Features'
import Categories from '../components/product/Categories'
import Products from '../components/product/Products'
import Brands from '../components/product/Brands'

const HomePage = () => {

  const {
    SliderListRequest,
    BrandListRequest,
    CategoryListRequest,
    ListByRemarkRequest,
  } = ProductStore()

  const { FeatureListRequest } = FeatureStore()

  useEffect(() => {
    (async () => {

      await SliderListRequest();
      await BrandListRequest();
      await CategoryListRequest();
      await ListByRemarkRequest("new");
      
      await FeatureListRequest();
    })()
  }, [])



  return (
    <Layout>
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />


      {/* <SliderSkeleton />
      <FeaturesSkeleton />
      <CategoriesSkeleton />
      <ProductsSekeleton />
      <BrandsSkeleton /> */}
    </Layout>
  )
}

export default HomePage