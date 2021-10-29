import {FC, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {getFeaturedProducts} from '../../redux/home/actionCreator'

import {
  FeaturedFood,
  ImageSlider,
  Motto,
  Contacts,
  Spinner
} from '../../components'

import {useAppSelector} from "../../hooks/useAppSelector";

const Home:FC = () => {
  const dispatch = useDispatch()
  const { featuredProducts } = useAppSelector(state => state.home)

  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [dispatch])

  return (
    <>
      {featuredProducts ? (
        <>
          <ImageSlider />
          <Motto />
          <FeaturedFood />
          <Contacts />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Home
