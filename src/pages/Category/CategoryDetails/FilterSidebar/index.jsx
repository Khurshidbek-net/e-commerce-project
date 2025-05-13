import React, { useEffect, useState } from 'react';
import ReactRangeSliderInput from 'react-range-slider-input';
import './FilterSide.scss';
import { ArrowPaginationIcon, ArrowPaginationRightIcon, FilterIcon } from '../../../../assets/icons';
import ArrowRightIcon from '../../../../assets/icons/src/ArrowRight.icon';
import ColorPicker from './ColorPicker';
import { sizeList } from '../../../ProductDetails/constants';
import { useProducts } from '../../../../hooks';
import Card from '../../../../components/Card';

const FilterSidebar = () => {
  const { data, isLoading } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [togglers, setTogglers] = useState({
    priceToggler: false,
    colorToggler: false,
    sizeToggler: false,
    dressStyleToggler: false,
  });

  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const productsPerPage = 9;

  // Filter logic
  const filteredData = data?.filter((product) => {
    const withinPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSize = selectedSize ? product.size.name === selectedSize : true;
    console.log(selectedSize, product.size);
    return withinPrice && matchesSize;
  });

  const totalPages = Math.ceil((filteredData?.length || 0) / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  useEffect(() => {
    const el = document.querySelectorAll('.range-slider__thumb');
    if (!!el[0] && !!el[1]) {
      el[0].innerHTML = `<span style="font-weight: 700; position: absolute; bottom: -20px; background-color: transparent !important">$${priceRange[0]}</span>`;
      el[1].innerHTML = `<span style="font-weight: 700; position: absolute; bottom: -20px; right: 5px; background-color: transparent !important">$${priceRange[1]}</span>`;
    }
  }, [priceRange]);

  const filterByClothes = [
    { filterKey: 'T-shirts', title: 'T-shirts' },
    { filterKey: 'Shorts', title: 'Shorts' },
    { filterKey: 'Shirts', title: 'Shirts' },
    { filterKey: 'Hoodie', title: 'Hoodie' },
    { filterKey: 'Jeans', title: 'Jeans' },
  ];

  const filterByDressStyle = [
    { filterKey: 'Casual', title: 'Casual' },
    { filterKey: 'Formal', title: 'Formal' },
    { filterKey: 'Party', title: 'Party' },
    { filterKey: 'Gym', title: 'Gym' },
  ];

  const handleToggler = (key) => {
    setTogglers({
      ...togglers,
      [key]: !togglers[key],
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    pageNumbers.push(
      <button
        key={1}
        className={`page-item ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    );

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pageNumbers.push(<span key="ellipsis-start" className="ellipsis">…</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(<span key="ellipsis-end" className="ellipsis">…</span>);
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="category">
      <div className="filter-side-wrapper">
        <div className="filter-header">
          <h3>Filters</h3>
          <FilterIcon />
        </div>
        <div className="hr-line-filter" />
        <div>
          {filterByClothes.map((item) => (
            <div className="filter-item" key={item.filterKey}>
              <span>{item.title}</span>
              <ArrowRightIcon />
            </div>
          ))}
        </div>

        <div className="hr-line-filter" />

        {/* Price Filter */}
        <div className="accordion">
          <div className="accordion-header" onClick={() => handleToggler('priceToggler')}>
            <p>Price</p>
            <div className={`arrow ${togglers.priceToggler ? 'arrow-top' : 'arrow-down'}`}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div className={`accordion-body ${togglers.priceToggler ? 'open' : 'hide'}`}>
          <ReactRangeSliderInput
            className="custom-range"
            min={5}
            max={500}
            onInput={(range) => {
              setPriceRange(range);
              setCurrentPage(1); // reset to page 1
            }}
          />
        </div>

        {/* Color */}
        <div className="hr-line-filter" />
        <div className="accordion">
          <div className="accordion-header" onClick={() => handleToggler('colorToggler')}>
            <p>Color</p>
            <div className={`arrow ${togglers.colorToggler ? 'arrow-top' : 'arrow-down'}`}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div className={`accordion-body color-accordion ${togglers.colorToggler ? 'open' : 'hide'}`}>
          <ColorPicker handleResult={(res) => console.log(res)} />
        </div>

        {/* Size */}
        <div className="hr-line-filter" />
        <div className="accordion">
          <div className="accordion-header" onClick={() => handleToggler('sizeToggler')}>
            <p>Size</p>
            <div className={`arrow ${togglers.sizeToggler ? 'arrow-top' : 'arrow-down'}`}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div className={`accordion-body size-accordion ${togglers.sizeToggler ? 'open' : 'hide'}`}>
          {sizeList.map((size) => (
            <div
              key={size.name}
              className={`size-item ${selectedSize === size.name ? 'active' : ''}`}
              onClick={() => {
                setSelectedSize(size.name === selectedSize ? null : size.name);
                setCurrentPage(1);
              }}
            >
              <span>{size.name}</span>
            </div>
          ))}
        </div>

        {/* Dress Style */}
        <div className="hr-line-filter" />
        <div className="accordion">
          <div className="accordion-header" onClick={() => handleToggler('dressStyleToggler')}>
            <p>Dress Style</p>
            <div className={`arrow ${togglers.dressStyleToggler ? 'arrow-top' : 'arrow-down'}`}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div className={`accordion-body dressStyle-accordion ${togglers.dressStyleToggler ? 'open' : 'hide'}`}>
          {filterByDressStyle.map((item) => (
            <div className="filter-item" key={item.filterKey}>
              <span>{item.title}</span>
              <ArrowRightIcon />
            </div>
          ))}
        </div>

        <button className="apply-btn">Apply Filter</button>
      </div>

      <div className="category-products-wrapper">
        <div className="category-header">
          <h3>Casual</h3>
          <p>
            Showing {filteredData?.length === 0 ? 0 : startIndex + 1}–
            {Math.min(endIndex, filteredData?.length || 0)} of {filteredData?.length || 0} Products
          </p>
        </div>

        <div className="category-products">
          {paginatedData?.length > 0 ? (
            paginatedData.map((item, index) => <Card key={index} product={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <div className="hr" />

        {/* Pagination */}
        <div className="pagination">
          <button
            className="nav-button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ArrowPaginationRightIcon /> Previous
          </button>
          <div className="page-numbers">{renderPageNumbers()}</div>
          <button
            className="nav-button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <ArrowPaginationIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
