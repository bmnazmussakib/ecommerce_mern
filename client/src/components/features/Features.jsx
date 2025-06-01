import React from 'react'
import FeatureStore from '../../store/FeatureStore'
import FeaturesSkeleton from '../../skeleton/FeaturesSkeleton'

const Features = () => {

  const { FeatureList } = FeatureStore()

  console.log('FeatureList: ', FeatureList)

  if (FeatureList === null) {
    return <FeaturesSkeleton />
  }
  else {
    return (
      <>
        <div className="container section">
          <div className="row">
            {
              FeatureList?.map((item, index) => {
                return (
                  <div className="col-6 p-2 col-md-3 col-lg-3 col-sm-6"key={index}>
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <img className='w-100' src={item?.img} alt="" />
                          </div>
                          <div className="col-8">
                            <h3 className='bodyXLarge'>{item?.name}</h3>
                            <span className='bodySmal'>{item?.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
  }

}

export default Features