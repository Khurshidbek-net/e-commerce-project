

import React, { useEffect, useState } from 'react'
import ReactRangeSliderInput from 'react-range-slider-input'

import 'react-range-slider-input/dist/style.css';
import './Category.scss'
import FilterSidebar from './FilterSidebar';
import { BreadCrumb } from '../../../components';
import { useParams } from 'react-router-dom';

const CategoryDetails = () => {

  const { name } = useParams();
  return (
    <div className='container'>
      <BreadCrumb />
      <FilterSidebar name={name} />
    </div>
  )
}

export default CategoryDetails