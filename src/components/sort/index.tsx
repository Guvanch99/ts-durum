import {useEffect, memo, FC, SyntheticEvent} from 'react'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {onChangeHandler, filterProducts} from '../../redux/menu/actionCreators'

import {useAppSelector} from "../../hooks/useAppSelector";

import {DATA} from '../../data'

import './index.scss'

const {sortOptions, buttonTranslateKeys} = DATA

interface ISort {
  view: boolean
  viewHandler: () => void
}

const Sort: FC<ISort> = ({view, viewHandler}) => {
  const dispatch = useDispatch()
  const {sort, sortCategory, filteredProducts} = useAppSelector(
    state => state.menu
  )

  const updateSort = (e: SyntheticEvent) => {
    const {value, name} = e.target as HTMLButtonElement
    const payload = {
      name,
      value
    }

    dispatch(onChangeHandler(payload))
  }

  useEffect(() => {
    dispatch(filterProducts())
  }, [sort, sortCategory, dispatch])

  const {t} = useTranslation('translation')

  return (
    <div className="sort">
      <div className="sort__views">
        <button className="sort__views-button" onClick={viewHandler}>
          <i className={`${view ? 'fas fa-th' : 'fas fa-list'} sort__views-icon`}/>
        </button>
      </div>
      <div className="sort-buttons">
        {buttonTranslateKeys.map(key => (
            <button
              onClick={updateSort}
              key={key}
              name="sortCategory"
              className="sort-buttons__option"
              value={key}
            >
              {t(`sort.buttonNames.${key}`)}
            </button>
          )
        )}
      </div>
      {filteredProducts.length ? (
        <h2 className="menu-count">
          {t('menuCount', {count: filteredProducts.length})}
        </h2>
      ) : null}
      <form className="sort-form">
        <label className="sort-form__label" htmlFor="sort">
          {t('sort.sortLabel')}
        </label>
        <select
          onChange={updateSort}
          className="sort-form__select"
          value={sort}
          name="sort"
        >
          {sortOptions.map(({value, keyName}, idx) => (
            <option
              className="sort-form__option"
              key={idx}
              value={value}
              disabled={idx === 0}
            >
              {t(`sort.sortOptions.${keyName}.name`)}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default memo(Sort)
