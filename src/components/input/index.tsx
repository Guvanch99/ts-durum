import {ChangeEvent, FC} from "react";
import classNames from 'classnames'

import './index.scss'

interface IInput {
  name: string
  value: string
  label: string
  error?: string
  type: string
  onChange: ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => void
  required: boolean
  handleBlur?: () => void
  disabled?: boolean
}

const Input: FC<IInput> = ({
                             name,
                             value,
                             label,
                             error,
                             type,
                             onChange,
                             required,
                             handleBlur,
                             disabled
                           }) => (
  <div className="input-container">
    <label htmlFor={name} className="input-container__label">
      {label}
    </label>
    <input
      className={classNames('input-container__input', {error})}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      placeholder={label}
      required={required}
      autoFocus={name === 'userName'}
      onBlur={handleBlur}
      disabled={disabled}
    />

    {error ? <span className="input-container__error">{error}</span> : null}
  </div>
)

export default Input
