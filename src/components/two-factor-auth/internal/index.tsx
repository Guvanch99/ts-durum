import React, {ChangeEvent, FC} from "react";

interface ITwoFactorAuthInput {
    name: number
    handleChange: ({target: {name, value, maxLength}}: ChangeEvent<HTMLInputElement>, idx: number) => void
    inputRefs: HTMLInputElement[]
    handleDelete: (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => void
    value: string
}

const TwoFactorAuthInput: FC<ITwoFactorAuthInput> = ({
                                                         name,
                                                         handleChange,
                                                         inputRefs,
                                                         handleDelete,
                                                         value
                                                     }) => (
    <input
        type="tel"
        min={0}
        max={9}
        step="1"
        placeholder="·"
        maxLength={6}
        autoComplete="one-time-code"
        className="twoFactorAuth__input"
        name={name.toString()}
        value={value}
        ref={input => (inputRefs[name] = input as HTMLInputElement)}
        onChange={e => handleChange(e, name)}
        onKeyDown={e => handleDelete(e, name)}
    />
)

export default TwoFactorAuthInput

