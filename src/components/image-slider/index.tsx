import {FC, useState, memo} from 'react'

import {useAppSelector} from "../../hooks/useAppSelector";

import './index.scss'

const ImageSlider: FC = () => {
  const [current, setCurrent] = useState<number>(0)
  const {gallery} = useAppSelector(state => state.home)
console.log('gallery',gallery)
  const imageLength = 5

  const nextImage = () =>
    setCurrent(current === imageLength - 1 ? 0 : current + 1)

  const prevImage = () =>
    setCurrent(current === 0 ? imageLength - 1 : current - 1)

  return (
    <figure className="slider">
      {gallery.map(
        ({id, src, alt}, index) =>
          index === current && (
            <img
              loading="lazy"
              key={index}
              className="slider__image"
              src={src}
              alt={alt}
            />
          )
      )}
      <figcaption><i onClick={prevImage} className="fas fa-arrow-left arrow-left arrow"/></figcaption>
      <figcaption><i onClick={nextImage} className="fas fa-arrow-right arrow-right arrow"/></figcaption>
    </figure>
  )
}

export default memo(ImageSlider)
