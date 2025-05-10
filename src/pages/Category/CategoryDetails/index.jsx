

import React, { useEffect, useState } from 'react'
import ReactRangeSliderInput from 'react-range-slider-input'

import 'react-range-slider-input/dist/style.css';
import './Category.scss'
import FilterSidebar from './FilterSidebar';
import { BreadCrumb } from '../../../components';

const CategoryDetails = () => {
  

  return (

    <div className='container'>
      <BreadCrumb/>
      <FilterSidebar/>
    </div>
  )
}

export default CategoryDetails