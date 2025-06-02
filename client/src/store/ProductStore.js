import { create } from 'zustand'
import axios from "axios"

const ProductStore = create((set) => ({
    BrandList: null,
    BrandListRequest: async () => {
        try {
            const res = await axios.get(`/api/v1/ProductBrandList`)
            if (res.data.status === 'success') {
                set({ BrandList: res.data.data })
            }
        } catch (error) {
            console.error("Error fetching BrandList:", error)
        }
    },

    CategoryList: null,
    CategoryListRequest: async () => {
        try {
            const res = await axios.get(`/api/v1/ProductCategoryList`)
            if (res.data.status === 'success') {
                set({ CategoryList: res.data.data })
            }
        } catch (error) {
            console.error("Error fetching CategoryList:", error)
        }
    },

    SliderList: null,
    SliderListRequest: async () => {
        try {
            const res = await axios.get(`/api/v1/ProductSliderList`)
            if (res?.data?.status === 'success') {
                set({ SliderList: res?.data?.data })
            }
        } catch (error) {
            console.error("Error fetching SliderList:", error)
        }
    },

    ListByRemark: null,
    ListByRemarkRequest: async (remark) => {
        try {
            const res = await axios.get(`/api/v1/ProductListByRemark/${remark}`)
            if (res.data.status === 'success') {
                set({ ListByRemark: res.data.data })
            }
        } catch (error) {
            console.error(`Error fetching products by remark (${remark}):`, error)
        }
    },

    ListByBrand: null,
    ListByBrandRequest: async (brand) => {
        try {
            const res = await axios.get(`/api/v1/ProductListByBrand/${brand}`)
            if (res.data.status === 'success') {
                set({ ListByBrand: res.data.data })
            }
        } catch (error) {
            console.error(`Error fetching products by brand (${brand}):`, error)
        }
    },

    ListByCategory: null,
    ListByCategoryRequest: async (category) => {
        try {
            const res = await axios.get(`/api/v1/ProductListByCategory/${category}`)
            if (res.data.status === 'success') {
                set({ ListByCategory: res.data.data })
            }
        } catch (error) {
            console.error(`Error fetching products by category (${category}):`, error)
        }
    },

    ListBySimilar: null,
    ListBySimilarRequest: async (category) => {
        try {
            const res = await axios.get(`/api/v1/ProductListBySimilar/${category}`)
            if (res.data.status === 'success') {
                set({ ListBySimilar: res.data.data })
            }
        } catch (error) {
            console.error(`Error fetching products by similar (${category}):`, error)
        }
    },

    ListByKeyword: null,
    ListByKeywordRequest: async (keyword) => {
        try {
            const res = await axios.get(`/api/v1/ProductListByKeyword/${keyword}`)
            if (res.data.status === 'success') {
                set({ ListByKeyword: res.data.data })
            }
        } catch (error) {
            console.error(`Error fetching products by keyword (${keyword}):`, error)
        }
    },

    ListByFilter: null,
    ListByFilterRequest: async (postBody) => {
        try {
            // set({ ListByFilter: null })
            console.log('postBody: ', postBody)
            const res = await axios.post(`/api/v1/ProductListByFilter`, postBody)
            console.log(res.data)
            if (res.data.status === 'success') {
                set({ ListByFilter: res.data.data })
            }
        } catch (error) {
            console.error(`Error fetching products by Filter (${postBody}):`, error)
        }
    },

    SearchKeyword: null,
    setSearchKeyword: async (keyword) => {
        set({ SearchKeyword: keyword })
    }
}))

export default ProductStore
