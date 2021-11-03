import {FC, useState} from 'react'

import style from './index.module.scss'

const Accordion: FC<{ label: string, description: string }> = ({label, description}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  let signs = isActive ? '-' : '+'

  return (
    <div className={style.accordion}>
      <div
        className={style.accordion__title}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={style.accordion__label}>{label}</div>
        <div className={style.accordion__sign}>{signs}</div>
      </div>
      {isActive ? (
        <p className={style.accordion__description}>{description}</p>
      ) : null}
    </div>
  )
}

export default Accordion
