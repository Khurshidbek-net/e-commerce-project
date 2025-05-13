import './NewArrivals.scss';
import { useState } from 'react';
import { useProducts } from '../../../../hooks';
import Card from '../../../../components/Card';

function NewArrivals() {
  const { data, isLoading } = useProducts();
  const [showAll, setShowAll] = useState(false);

  const handleViewAll = () => {
    setShowAll(true);
  };

  const displayedProducts = showAll ? data : data?.slice(0, 4);

  return (
    <div className='container'>
      <div className='new-arrivals-item'>
        <h2>NEW ARRIVALS</h2>
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
      <hr />
    </div>
  );
}

export default NewArrivals;
