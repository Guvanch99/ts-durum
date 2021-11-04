import {FC, useState} from 'react'

import style from './index.module.scss'

const Accordion: FC<{ label: string, description: string }> = ({label, description}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  let signs = isActive ? '-' : '+'

  return (
    <main className={style.accordion}>
      <hgroup
        className={style.accordion__title}
        onClick={() => setIsActive(!isActive)}
      >
        <h1 className={style.accordion__label}>{label}</h1>
        <span className={style.accordion__sign}>{signs}</span>
      </hgroup>
      {isActive ? (
        <p className={style.accordion__description}>{description}</p>
      ) : null}
    </main>
  )
}

export default Accordion
