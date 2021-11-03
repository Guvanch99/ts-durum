import React, {ChangeEvent, FC, ReactElement} from "react";

import TwoFactorAuthInput from '../two-factor-auth/internal'

import {THIRD_ELEMENT} from '../../constants/variables.constants'

import styles from './inputs.module.scss'

interface IDynamicInputs {
  handleChange: ({target: {name, value, maxLength}}: ChangeEvent<HTMLInputElement>, idx: number) => void
  inputRefs: HTMLInputElement[]
  handleDelete: (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => void
  values: string[]
}

const DynamicInputs: FC<IDynamicInputs> = ({handleChange, inputRefs, handleDelete, values}): ReactElement =>
  <>
    {values.map((input: string, idx: number) => (
        <div className={styles.inputContainer} key={idx}>
          <TwoFactorAuthInput
            inputRefs={inputRefs}
            handleChange={handleChange}
            name={idx}
            value={input}
            handleDelete={handleDelete}
          />
          {idx === THIRD_ELEMENT ? <div className={styles.spacer}>-</div> : null}
        </div>
      )
    )}
  </>

export default DynamicInputs
