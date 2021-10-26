import { FC,memo } from 'react'

import './index.scss'

const ArticleName:FC<{name:string}> = ({ name }) => <h1 className="article-name">{name}</h1>

export default memo(ArticleName)
