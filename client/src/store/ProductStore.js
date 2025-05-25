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
}))

export default ProductStore
