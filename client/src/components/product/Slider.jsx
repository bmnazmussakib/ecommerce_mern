import React from 'react'
import ProductStore from '../../store/ProductStore'
import SliderSkeleton from '../../skeleton/SliderSkeleton'

const Slider = () => {

    const { SliderList } = ProductStore()

    // console.log('SliderList: ', SliderList)

    if (SliderList === null) {
        return <SliderSkeleton />
    } else {

        return (
            <div className="container-fluid hero-bg d-flex align-items-center">

                <div id="carouselExampleIndicators" class="carousel slide w-100">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        {
                            SliderList && SliderList.map((item, index) => {
                                return (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item._id}>
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                                <h1 className='text-white'>{item?.title}</h1>
                                                <p className='text-white'>{item?.des}</p>
                                            </div>
                                            <div className="col-12  col-lg-5 col-sm-12 col-md-5  ">
                                                <img src={item?.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div class="carousel-item">
                            <img src="..." class="d-block w-100" alt="..."/>
                        </div> */}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        )
    }

}

export default Slider