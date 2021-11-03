import {FC, useState, memo} from 'react'

import {DATA} from '../../data'

import './index.scss'

const {images} = DATA

const ImageSlider: FC = () => {
  const [current, setCurrent] = useState<number>(0)
  const imageLength: number = images.length

  const nextImage = () =>
    setCurrent(current === imageLength - 1 ? 0 : current + 1)

  const prevImage = () =>
    setCurrent(current === 0 ? imageLength - 1 : current - 1)

  return (
    <div className="slider">
      {images.map(
        ({url, text}, index) =>
          index === current && (
            <img
              loading="lazy"
              key={index}
              className="slider__image"
              src={url}
              alt={text}
            />
          )
      )}
      <i onClick={prevImage} className="fas fa-arrow-left arrow-left arrow"/>
      <i onClick={nextImage} className="fas fa-arrow-right arrow-right arrow"/>
    </div>
  )
}

export default memo(ImageSlider)
