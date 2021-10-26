import { useEffect, useState} from 'react'

export const useDebounced = (value: string) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)
    let timer: ReturnType<typeof setTimeout>

    useEffect(
        () => {
            timer = setTimeout(() => setDebouncedValue(value), 200)

            return () => clearTimeout(timer)
        }, [value])

    return debouncedValue
}
