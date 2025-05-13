import React, { useState } from 'react';
import "./TopSelling.scss";
import { useProducts } from '../../../../hooks';
import Card from '../../../../components/Card';

function TopSelling() {
  const { data, isLoading } = useProducts();
  const [showAll, setShowAll] = useState(false);

  const handleViewAll = () => {
    setShowAll(true);
  };

  const displayedProducts = showAll ? data : data?.slice(14, 18);

  return (
    <div className='container'>
      <div className='top-selling-h2'>
        <h2>Top Selling</h2>
      </div>
      <div className='item-cards'>
        {displayedProducts?.map((product, index) => (
          <Card
            key={index}
            product={product}
          />
        ))}
      </div>
      {!showAll && data?.length > 4 && (
        <div className='view-all'>
          <button onClick={handleViewAll}>View All</button>
        </div>
      )}
    </div>
  )
}

export default TopSelling;