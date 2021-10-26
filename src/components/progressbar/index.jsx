import './index.scss'

const Progressbar = ({ stepCount, activeStep }) => {
  let progress = [...Array(stepCount).keys()].map(i => <li
    className={`progressbar__count ${(i + 1 <= activeStep )? 'active' : null} ${(i + 1 < activeStep )? 'completed' : null}`  } key={i} />)
  return (
    <div className='progressbar-container'>
      <ul className='progressbar'>
        {progress}
      </ul>
    </div>
  )
}

export default Progressbar