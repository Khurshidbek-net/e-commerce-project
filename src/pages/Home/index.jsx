

import React from 'react'
import {
  ByDressSection,
  MainSection,
  NewArrivalsSection,
  TopSellingSection
} from './components'

import {useCategories, useProducts} from '../../hooks'

const HomePage = () => {

  // const {data, isLoading} = useCategories();
  const {data, isLoading} = useProducts();

  return (
    <div>
      <MainSection />
      <NewArrivalsSection />
      <TopSellingSection />
      <ByDressSection />
    </div>
  )
}

export default HomePage