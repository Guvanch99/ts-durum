import {FC, memo} from "react";
import './index.scss'

const Progressbar: FC<{ stepCount: number, activeStep: number }> = ({stepCount, activeStep}) => {
  let progress = [...Array(stepCount).keys()].map(i => <li
    className={`progressbar__count
     ${(i + 1 <= activeStep) &&'active' } 
     ${(i + 1 < activeStep) && 'completed'}`}
    key={i}/>)

  return (
    <section className='progressbar-container'>
      <ul className='progressbar'>
        {progress}
      </ul>
    </section>
  )
}

export default memo(Progressbar)
