import {useEffect, useState, useCallback, ChangeEvent} from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {
  Sort,
  ProductsList,
  Spinner,
  PageHero,
  ArticleName
} from '../../../components'

import {getAllProducts} from '../../../redux/menu/actionCreators'

import {useAppSelector} from "../../../hooks/useAppSelector";

import {DB} from '../../../core/axios'

import {throttle} from '../../../utils'

import {IProduct} from "../../../models/interfaces";

const Durum = () => {
  const {t} = useTranslation('translation')
  const [view, setView] = useState<boolean>(true)
  const [fetching, setFetching] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const dispatch = useDispatch()

  const {allProducts} = useAppSelector(state => state.menu)

  useEffect(() => {
      fetching && DB.get<IProduct[]>(`/all-products?_limit=4&_page=${currentPage}`).then(({data}) => {
        dispatch(getAllProducts(data))
        setFetching(false)
        setCurrentPage(prev => prev + 1)
      })

    }, [fetching, dispatch, currentPage]
  )

  useEffect(
    () => {
      document.addEventListener('scroll', throttle(scrollHandler, 1000))

      return () => document.removeEventListener('scroll', throttle(scrollHandler, 1000))
    }, []
  )

  const viewHandler = useCallback(() => setView(!view), [view])

  const HUNDRED = 100

  const scrollHandler = ({target: {documentElement: {scrollHeight, scrollTop}}}: ChangeEvent<Document>) => {
    if (scrollHeight - (scrollTop + window.innerHeight) < HUNDRED)
      setFetching(true)
  }

  return (
    <>
      {allProducts ? (
        <section>
          <PageHero title={t('pageHero.durum')}/>
          <ArticleName name={t('articleNames.durum')}/>
          <article>
            <Sort view={view} viewHandler={viewHandler}/>
            <ProductsList view={view}/>
          </article>
        </section>
      ) : (
        <Spinner/>
      )}
    </>
  )
}

export default Durum
