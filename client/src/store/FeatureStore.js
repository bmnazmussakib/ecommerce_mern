import { create } from 'zustand'
import axios from "axios"

const FeatureStore = create((set) => ({
    FeatureList: null,
    FeatureListRequest: async () => {
        try {
            const res = await axios.get(`/api/v1/FeaturesList`)
            
            if (res?.data?.status === 'success') {
                set({ FeatureList: res?.data?.data })
            }
        } catch (error) {
            console.error("Error fetching FeatureList:", error)
        }
    }
}))

export default FeatureStore;
