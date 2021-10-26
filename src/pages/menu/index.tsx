//@ts-nocheck
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  Sort,
  ProductsList,
  Spinner,
  PageHero,
  ArticleName
} from '../../components'

import {useAppSelector} from "../../hooks/useAppSelector";

import { getAllProducts } from '../../redux/menu/actionCreators'

import { DB } from '../../core/axios'

import { throttle } from '../../utils'

const Menu = () => {
  const { t } = useTranslation('translation')
  const [view, setView] = useState<boolean>(true)
  const [fetching, setFetching] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const dispatch = useDispatch()

  const { allProducts } = useAppSelector(state => state.menu)

  const viewHandler = useCallback(() => setView(!view), [view])

  useEffect(() => {
      if (fetching) {
        DB(`/all-products?_limit=4&_page=${currentPage}`).then(({ data }) => {
          dispatch(getAllProducts(data))
          setFetching(false)
          setCurrentPage(prev => prev + 1)
        })
      }
    }, [fetching, dispatch,currentPage]
  )

  useEffect(
    () => {
      document.addEventListener('scroll', throttle(scrollHandler, 1000))

      return () => document.removeEventListener('scroll', scrollHandler)
    }, []
  )
//TODO
  const scrollHandler = ({ target: { documentElement: { scrollHeight, scrollTop } } }:any) => {
    if (scrollHeight - (scrollTop + window.innerHeight) < 100)
      setFetching(true)
  }

  return (
    <>
      {allProducts ? (
        <div>
          <PageHero title={t('pageHero.menu')} />
          <ArticleName name={t('articleNames.menu')} />
          <div>
            <Sort view={view} viewHandler={viewHandler} />
            <ProductsList view={view} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Menu
