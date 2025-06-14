import React from 'react'
import ProductStore from '../../store/ProductStore'
import BrandsSkeleton from '../../skeleton/BrandsSkeleton'
import { Link } from 'react-router-dom'

const Brands = () => {

  const { BrandList } = ProductStore()

  console.log('BrandList: ', BrandList)

  if (BrandList === null) {
    return <BrandsSkeleton />
  } else {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
            <span className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br />Shopping Categories </span>
            {
              BrandList?.map((item, index) => {
                return (
                  <div className="col-6 col-lg-8r text-center col-md-8r p-2" key={index}>
                    <Link to={`/by-brand/${item?._id}`} className="text-decoration-none">
                      <div className="card h-100 rounded-3 bg-white">
                        <div className="card-body">
                          <img className="w-75" src={item?.brandImg} />
                          <p className="bodySmal mt-3">{item?.brandName}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

}

export default Brands