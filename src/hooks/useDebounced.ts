import { useEffect, useState} from 'react'

export const useDebounced = (value: string|number) => {
    const [debouncedValue, setDebouncedValue] = useState<string|number>(value)
    let timer: ReturnType<typeof setTimeout>

    useEffect(
        () => {
            timer = setTimeout(() => setDebouncedValue(value), 200)

            return () => clearTimeout(timer)
        }, [value])

    return debouncedValue
}
