import {FC, memo} from 'react'

import shawarma from '../../assets/shawarma.png'

import './index.scss'

const Spinner: FC = () => (
  <figure className="spinner">
    <img className="spinner_img" src={shawarma} alt="shawarma"/>
  </figure>
)
export default memo(Spinner)
