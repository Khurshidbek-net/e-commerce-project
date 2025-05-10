import React from 'react'
import { useParams } from 'react-router';
import { useProductById } from '../../hooks/useProducts';

import './ProductDetails.scss'
import { getRating } from '../../utils/getRating';
function ProductDetails() {
  const { id } = useParams();
  const { data } = useProductById(id);

  return (
    <>
      <div className='hr-line' />
      <div className='product-cart container'>
        <div className='images'>
          <img src={data?.images[0]} alt="" />
        </div>
        <div className='product-details'>
          <h3 className='product-title'>{data?.title}</h3>
          <div className='product-rating'>
            {getRating(data?.rating)}
            <span className='product-rating-value'>{data?.rating}/5</span>
          </div>
          <div className='prices'>
            <div className='product-price'>${data?.price}</div>
            {data?.oldPrice && (
              <>
                <div className='product-old-price'>${data?.oldPrice}</div>
                <div className='product-discount'>
                  -{Math.round(((data.oldPrice - data.price) / data.oldPrice) * 100)}%
                </div>
              </>
            )}
          </div>
          <div className='product-desc'>{data?.description}</div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails;