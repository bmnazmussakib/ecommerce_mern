import React, { useEffect, useState } from 'react'
import ProductStore from '../../store/ProductStore'
import ProductsSekeleton from '../../skeleton/ProductsSekeleton'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

const ProductList = ({ data }) => {


  const { BrandList, CategoryList, BrandListRequest, CategoryListRequest, ListByFilter, ListByFilterRequest } = ProductStore()
  // console.log('Product List Data brand: ', BrandList)


  const [FilterParams, setFilterParams] = useState({
    brandID: '',
    categoryID: '',
    priceMax: '',
    priceMin: ''
  })


  useEffect(() => {
    (async () => {
      BrandList == null ? await BrandListRequest() : null;
      CategoryList == null ? await CategoryListRequest() : null;

      let isEveryFilterParamsEmpty = Object.values(FilterParams).every(value => value === '')
      !isEveryFilterParamsEmpty ? await ListByFilterRequest(FilterParams) : null;

    })();
  }, [FilterParams])


  const handleOnChange = async (name, value) => {
    setFilterParams((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // console.log('filterParams: ', FilterParams)
  // console.log('ListByFilter: ', ListByFilter)


  return (
    <>
      { }
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-3 p-2">
            <div className="card vh-100 p-3 shadow-sm">
              <label htmlFor="" className="form-label mt-3">Brands</label>
              <select name="" id="" value={FilterParams.brandID} onChange={(e) => handleOnChange('brandID', e.target.value) } className="form-control form-select">
                <option value="">Choose Brand</option>
                {
                  BrandList === null ? <option value="">Loading...</option> : <>
                    {
                      BrandList?.map((item, index) => {
                        return (
                          <option value={item?._id} key={index}>{item?.brandName}</option>
                        )
                      })
                    }
                  </>
                }
              </select>
              <label htmlFor="" className="form-label mt-3">Categories</label>
              <select name="" id="" value={FilterParams.categoryID} onChange={(e) => handleOnChange('categoryID', e.target.value) } className="form-control form-select">
                <option value="">Choose Category</option>
                {
                  CategoryList === null ? <option value="">Loading...</option> : <>
                    {
                      CategoryList?.map((item, index) => {
                        return (
                          <option value={item?._id} key={index}>{item?.categoryName}</option>
                        )
                      })
                    }
                  </>
                }
              </select>
              <label htmlFor="" className="form-label mt-3">Max Price ${ FilterParams.priceMax }</label>
              <input min={0} max={1000000} step={1000} type="range" value={FilterParams.priceMax} onChange={(e) => handleOnChange('priceMax', e.target.value) } className="form-range" />
              <label htmlFor="" className="form-label mt-3">Min Price ${ FilterParams.priceMin }</label>
              <input min={0} max={1000000} step={1000} type="range" value={FilterParams.priceMin} onChange={(e) => handleOnChange('priceMin', e.target.value) } className="form-range" />
            </div>
          </div>
          <div className="col-md-9 p-2">
            <div className="row">
              {
                data === null ? <ProductsSekeleton /> : <>
                  {
                    data?.map((item, index) => {
                      return (
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={index}>
                          <Link to="" className="card shadow-sm h-100 rounded-3 bg-white">
                            <img className="w-100 rounded-top-2" src={item?.image} />
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">{item?.title}</p>
                              <p className="bodyMedium  text-dark my-1">Price: {item?.discount ? <>${item?.discountPrice} <strike>${item?.price}</strike></> : <>${item?.price}</>}</p>
                              <StarRatings rating={parseInt(item?.star)} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList