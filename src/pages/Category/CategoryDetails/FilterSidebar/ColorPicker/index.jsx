import React, { useState } from 'react'
import { colorsList } from './constants'
import { TickIcon } from '../../../../../assets/icons'

import './ColorPicker.scss'
const ColorPicker = ({handleResult}) => {

  const [selectedColors, setSelectedColors] = useState([])

  const handleColorClick = (colorObj) => {

    if (selectedColors.includes(colorObj.code)){
      setSelectedColors((prev) => selectedColors.filter(c => c !== colorObj.code))
      handleResult(selectedColors.filter(c => c!== colorObj.code))
    }else{
      setSelectedColors((prev) => [...selectedColors, colorObj.code])
      handleResult([...selectedColors, colorObj.code])

    }
    selectedColors.includes(colorObj.code)

    handleResult(selectedColors);
  }
  return (
    <div>
      <div className='colors-wrapper'>
        {colorsList.map(color => {
          return (
            <div
              onClick={() => handleColorClick(color)}
              className='color-item'
              style={{
                backgroundColor: color.code
              }}
            >
              {selectedColors.includes(color.code)
                ? <TickIcon color={color.name === "White"
                  ? "#000"
                  : "#fff"}/>
              : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ColorPicker