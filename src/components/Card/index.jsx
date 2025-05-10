

import React from 'react'

import './Product.scss'
import { FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router';
import { getRating } from '../../utils/getRating'




const Card = ({ product }) => {
  console.log(product)
  const { images, title, price, rating, id } = product;

  return (
    <div>
      <img src={images[0]} alt={title} className='product-image' />
      <div>
        <FaRegHeart />
        <MdAddShoppingCart />
      </div>
      <div className='product-card'>
        <div className='product-info'>
          <Link key={id} to={`/productDetail/${id}`}>
            <h3 className='product-title'>{title}</h3>
          </Link>
          <div className='product-rating'>
            {getRating(rating)}
            <span className='product-rating-value'>{rating}/5</span>
          </div>
          <div className='product-price'>${price}</div>
        </div>
      </div>
    </div>
  )
}

export default Card