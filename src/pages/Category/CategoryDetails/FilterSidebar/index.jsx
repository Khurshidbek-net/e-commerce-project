import React, { useEffect, useState, useMemo } from 'react';
import ReactRangeSliderInput from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'; 
import './FilterSide.scss';
import { ArrowPaginationIcon, ArrowPaginationRightIcon, FilterIcon } from '../../../../assets/icons';
import ArrowRightIcon from '../../../../assets/icons/src/ArrowRight.icon';
import ColorPicker from './ColorPicker';
import { sizeList } from '../../../ProductDetails/constants';
import { useProducts } from '../../../../hooks'; 
import Card from '../../../../components/Card'; 
const FilterSidebar = ({name}) => {
  const { data, isLoading } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [togglers, setTogglers] = useState({
    priceToggler: false,
    colorToggler: false,
    sizeToggler: false,
    dressStyleToggler: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  const [stagedPriceRange, setStagedPriceRange] = useState([0, 500]); 
  const [stagedSelectedSizeCodes, setStagedSelectedSizeCodes] = useState([]);

  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 500]); 
  const [appliedSelectedSizeCodes, setAppliedSelectedSizeCodes] = useState([]);

  const productsPerPage = 9;

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((product) => {
      const withinPrice = product.price >= appliedPriceRange[0] && product.price <= appliedPriceRange[1];

      const matchesSize = appliedSelectedSizeCodes.length === 0
        ? true
        : product.size && product.size.some(productSizeCode => appliedSelectedSizeCodes.includes(productSizeCode));

      return withinPrice && matchesSize;
    });
  }, [data, appliedPriceRange, appliedSelectedSizeCodes]);

  const totalPages = Math.ceil((filteredData?.length || 0) / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);


  useEffect(() => {
    const sliderElement = document.querySelector('.custom-range');
    if (sliderElement) {
      const thumbs = sliderElement.querySelectorAll('.range-slider__thumb');
      if (thumbs && thumbs.length === 2) {
        thumbs[0].innerHTML = `<span style="font-weight: 600; position: absolute; bottom: -20px; left: -1px;">$${stagedPriceRange[0]}</span>`;
        thumbs[1].innerHTML = `<span style="font-weight: 600; position: absolute; bottom: -20px; right: 2px;">$${stagedPriceRange[1]}</span>`;
      }
    } 
  }, [stagedPriceRange]);

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
    setTogglers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApplyFilters = () => {
    setAppliedPriceRange([...stagedPriceRange]); 
    setAppliedSelectedSizeCodes([...stagedSelectedSizeCodes]); 
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages === 0) return pageNumbers;

    pageNumbers.push(
      <button
        key={1}
        className={`page-item ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    );

    if (totalPages === 1) return pageNumbers;

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pageNumbers.push(<span key="ellipsis-start" className="ellipsis">…</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
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
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(<span key="ellipsis-end" className="ellipsis">…</span>);
    }

    pageNumbers.push(
      <button
        key={totalPages}
        className={`page-item ${currentPage === totalPages ? 'active' : ''}`}
        onClick={() => setCurrentPage(totalPages)}
      >
        {totalPages}
      </button>
    );

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
            min={0} 
            max={500}
            value={stagedPriceRange} 
            onInput={(range) => {
              setStagedPriceRange(range);
            }}
          />
        </div>

        {/* Color Filter */}
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
          <ColorPicker handleResult={(res) => console.log('Color selected (staged):', res)} />
        </div>

        {/* Size Filter */}
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
              key={size.code} 
              className={`size-item ${stagedSelectedSizeCodes.includes(size.code) ? 'active' : ''}`}
              onClick={() => {
                setStagedSelectedSizeCodes((prevSelectedCodes) => {
                  if (prevSelectedCodes.includes(size.code)) {
                    return prevSelectedCodes.filter((code) => code !== size.code);
                  } else {
                    return [...prevSelectedCodes, size.code];
                  }
                });
              }}
            >
              <span>{size.name}</span>
            </div>
          ))}
        </div>

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

        <button className="apply-btn" onClick={handleApplyFilters}>Apply Filter</button>
      </div>

      <div className="category-products-wrapper">
        {isLoading && <p>Loading products...</p>}
        {!isLoading && (
          <>
            <div className="category-header">
              <h3>{name}</h3>
              <p>
                Showing {filteredData?.length === 0 ? 0 : startIndex + 1}–
                {Math.min(endIndex, filteredData?.length || 0)} of {filteredData?.length || 0} Products
              </p>
            </div>

            <div className="category-products">
              {paginatedData?.length > 0 ? (
                paginatedData.map((item, index) => (
                  <Card key={item.id || index} product={item} /> 
                ))
              ) : (
                <p>No products found matching your criteria.</p>
              )}
            </div>

            <div className="hr" />

            {/* Pagination */}
            {totalPages > 0 && (
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
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next <ArrowPaginationIcon/>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;