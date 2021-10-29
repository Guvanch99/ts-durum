import  {FC, useEffect, useMemo} from 'react'
import {createPortal} from 'react-dom'

const Portal: FC<{  nameOfClass: string}> = ({children, nameOfClass}) => {
  const el:HTMLDivElement = useMemo(() => document.createElement('div'), [])
  el.setAttribute('class', nameOfClass)
  useEffect(() => {
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [el])

  return createPortal(children, el)
}

export default Portal