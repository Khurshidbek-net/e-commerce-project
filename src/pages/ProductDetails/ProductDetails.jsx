import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useProductById, useProducts } from '../../hooks/useProducts';

import { getRating } from '../../utils/getRating';
import { FilterIcon, TickIcon } from '../../assets/icons';
import { productDetails, productFaqs, sizeList } from './constants';
import Card from '../../components/Card';

import './ProductDetails.scss'
import ReviewCard from '../../components/Reviews';
import { mockReviews } from '../../components/Reviews/reviews';
import { toast } from 'react-toastify';

const colorsList = [
  { code: '#44260b', name: 'Brown' },
  { code: '#023902', name: 'Green' },
  { code: '#1f1f61', name: 'Blue' },
];
function ProductDetails() {
  const { id } = useParams();
  const { data } = useProductById(id);
  const { data: products, isLoading } = useProducts();



  const limitedImages = data?.images.slice(0, 3);
  const limitedProducts = products?.slice(0, 4);

  useEffect(() => {
    if (limitedImages && limitedImages.length > 0) {
      setMainImage(limitedImages[0]);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(limitedImages?.[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);


  const handleQuantity = (e) => {
    if (e.target.innerText === '+') {
      setQuantity(quantity + 1);
    } else if (e.target.innerText === '-') {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleSelect = (colorCode) => {
    setSelectedColor(colorCode);
  };

  const handleSize = (e, size) => {
    const sizeItems = document.querySelectorAll('.size-item');
    sizeItems.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
    setSelectedSize(size);
  };


  const handleOption = (index) => {
    setActiveIndex(index);
  };
  const options = ['Product Details', 'Rating & Reviews', 'FAQs'];


  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.warning("Please select size and color before adding to cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const cartItem = {
      id: data.id,
      title: data.title,
      price: data.price,
      oldPrice: data.oldPrice || null,
      image: data.images?.[0],
      size: selectedSize,
      color: colorsList.find(color => color.code === selectedColor)?.name,
      quantity,
    };

    const existingIndex = cart.findIndex(
      (item) => item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Product added to cart!");
  };


  return (
    <>
      <div className='hr-line' />
      <div className='product-cart container'>
        <div className='images'>
          <div className='thumbnails'>
            {limitedImages?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={mainImage === img ? 'active' : ''}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className='main-image'>
            <img src={mainImage} alt='Main product' />
          </div>
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
          <div className='hr-line-between' />
          <div className='product-colors'>
            <h3>Select Colors</h3>
            <div className='colors'>
              {colorsList.map(color => {
                return (
                  <div
                    key={color.code}
                    className='color'
                    onClick={() => handleSelect(color.code)}
                    style={{
                      backgroundColor: color.code
                    }}
                  > {selectedColor === color.code && (
                    <TickIcon height={16} width={20} />
                  )}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='hr-line-between' />
          <div className='product-size'>
            <h3>Choose Size</h3>
            <div className='sizes'>
              {data?.size.map((sizeCode, index) => {
                const sizeObj = sizeList.find(s => s.code === sizeCode);
                return (
                  <div key={index} onClick={(e) => handleSize(e, sizeObj?.name)} className='size-item'>
                    {sizeObj?.name}
                  </div>
                );
              })}
            </div>

          </div>
          <div className='hr-line-between' />
          <div className='product-add-to-cart'>
            <div className='quantity'>
              <button onClick={handleQuantity} className='quantity-btn'>-</button>
              <span className='quantity-value'>{quantity}</span>
              <button onClick={handleQuantity} className='quantity-btn'>+</button>
            </div>
            <div>
              <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>

        </div>
      </div>

      {/* Reviews */}
      <div className='reviews container'>
        <div className='reviews-header'>
          {options.map((label, index) => (
            <h2
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => handleOption(index)}
            >
              {label}
            </h2>
          ))}
        </div>
        <div className='hr-line-review' />
        {activeIndex === 1 && (
          <>
            <div className='reviews-list-header'>
              <h3>All Reviews <span>(20)</span></h3>
              <div className='actions'>
                <div className='filter'><FilterIcon opacity={1} /></div>
                <div className='sort'>
                  Latest
                </div>
                <div className='write-review'>
                  <button>Write a Review</button>
                </div>
              </div>

            </div>
            <div className='reviews-list fade-in'>
              {mockReviews.slice(0, visibleCount).map((reviews, index) => (
                <ReviewCard key={index} reviews={reviews} />
              ))}
            </div>

            {visibleCount < mockReviews.length && (
              <div className='load-more'>
                <button onClick={handleLoadMore}>Load More Reviews</button>
              </div>
            )}
          </>
        )}

        {activeIndex === 0 && (
          <div className='product-details-content fade-in'>
            <h3>Product Details</h3>
            <ul className='details-list'>
              {productDetails.map((item, index) => (
                <li key={index}><span className='bullet'>✔</span> {item}</li>
              ))}
            </ul>
          </div>
        )}
        {activeIndex === 2 && (
          <div className='product-faqs fade-in'>
            <h3><span className='icon'>❓</span> Frequently Asked Questions</h3>
            {productFaqs.map((faq, idx) => (
              <details key={idx} className='faq-item'>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* You might also like */}
      <div className='you-might-like container'>
        <h3 className=''>You might also like</h3>
        <div className='you-might-like-list'>
          {limitedProducts?.map((product, index) => (
            <Card product={product} />
          ))}
        </div>
      </div>

    </>
  )
}

export default ProductDetails;