import {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {
  FeaturedFood,
  ImageSlider,
  Motto,
  Contacts,
  Spinner
} from '../../components'

import {getBaseDataFirebase, setFeaturedProducts} from '../../redux/home/actionCreator'

import {useAppSelector} from "../../hooks/useAppSelector";

const Home: FC = () => {
  const dispatch = useDispatch()
  const {featuredProducts, gallery} = useAppSelector(state => state.home)

  useEffect(() => {
    getBaseDataFirebase().then(data => dispatch(setFeaturedProducts(data)))
  }, [dispatch])

  return (
    <>
      {(featuredProducts && gallery) ? (
        <>
          <ImageSlider/>
          <Motto/>
          <FeaturedFood/>
          <Contacts/>
        </>
      ) : (
        <Spinner/>
      )}
    </>
  )
}

export default Home
