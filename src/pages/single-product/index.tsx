import {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {Spinner, Product, PageHero} from '../../components'

import {fetchSingleProduct} from '../../redux/single-product/actionCreator'

import {useAppSelector} from "../../hooks/useAppSelector";

import './index.scss'

const SingleProduct: FC = () => {
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()
  const {singleProduct} = useAppSelector(state => state.singleProduct)
  const {id} = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [dispatch, id])

  return (
    <>
      {singleProduct ? (
        <section className='single-product'>
          <PageHero menu={true} title={t('pageHero.singleProduct')}/>
          <Product singleProduct={singleProduct}/>
        </section>
      ) : (
        <Spinner/>
      )}
    </>
  )
}

export default SingleProduct
