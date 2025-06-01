import React from 'react'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ProductStore from '../../store/ProductStore';
import ProductsSekeleton from '../../skeleton/ProductsSekeleton';

const Products = () => {

  const { ListByRemark, ListByRemarkRequest } = ProductStore()

  console.log('ListByRemark: ', ListByRemark)


  return (
    <div className="section">
      <div className="container-fluid py-5 bg-light">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
          <span className="bodySmal mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>
          <div className="col-12">
            

            <div>
              <ul className="nav nav-pills p-3 justify-content-center mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => ListByRemarkRequest('new')}
                    className="nav-link active"
                    id="pills-new-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-new"
                    type="button"
                    role="tab"
                    aria-controls="pills-new"
                    aria-selected="true"
                  >
                    New
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => ListByRemarkRequest('trending')}
                    className="nav-link"
                    id="pills-trending-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-trending"
                    type="button"
                    role="tab"
                    aria-controls="pills-trending"
                    aria-selected="false"
                  >
                    Trending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => ListByRemarkRequest('popular')}
                    className="nav-link"
                    id="pills-popular-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-popular"
                    type="button"
                    role="tab"
                    aria-controls="pills-popular"
                    aria-selected="false"
                  >
                    Popular
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => ListByRemarkRequest('top')}
                    className="nav-link"
                    id="pills-top-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-top"
                    type="button"
                    role="tab"
                    aria-controls="pills-top"
                    aria-selected="false"
                  >
                    Top
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => ListByRemarkRequest('special')}
                    className="nav-link"
                    id="pills-special-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-special"
                    type="button"
                    role="tab"
                    aria-controls="pills-special"
                    aria-selected="false"
                  >
                    Special
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-new"
                  role="tabpanel"
                  aria-labelledby="pills-new-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    {
                      ListByRemark == null ?
                        <ProductsSekeleton /> :
                        <div className="row">
                          {
                            ListByRemark.map((item, index) => {
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
                        </div>
                    }
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-trending"
                  role="tabpanel"
                  aria-labelledby="pills-trending-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    {
                      ListByRemark == null ?
                        <ProductsSekeleton /> :
                        <div className="row">
                          {
                            ListByRemark.map((item, index) => {
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
                        </div>
                    }
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-popular"
                  role="tabpanel"
                  aria-labelledby="pills-popular-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    {
                      ListByRemark == null ?
                        <ProductsSekeleton /> :
                        <div className="row">
                          {
                            ListByRemark.map((item, index) => {
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
                        </div>
                    }
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-top"
                  role="tabpanel"
                  aria-labelledby="pills-top-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    {
                      ListByRemark == null ?
                        <ProductsSekeleton /> :
                        <div className="row">
                          {
                            ListByRemark.map((item, index) => {
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
                        </div>
                    }
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-special"
                  role="tabpanel"
                  aria-labelledby="pills-special-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    {
                      ListByRemark == null ?
                        <ProductsSekeleton /> :
                        <div className="row">
                          {
                            ListByRemark.map((item, index) => {
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
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Products