import React from 'react';
import './NewArrivals.scss'
import { BiSolidStar } from 'react-icons/bi';
import { useProducts } from '../../../../hooks';
import Card from '../../../../components/Card';

function NewArrivals() {

  const { data, isLoading } = useProducts();

  return (
    <div className='container'>
      <div className='new-arrivals-item'>
        <h2>NEW ARRIVALS</h2>
      </div>
      <div className='item-cards'>
        {data?.map((product, index) => (
            <Card
              key={index}
              product={product}
            />
        ))}
      </div>
      <hr />
    </div>
  )
}

export default NewArrivals;