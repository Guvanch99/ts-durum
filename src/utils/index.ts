export const randomId = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const upperCaseString = (str: string) => str.trim().toUpperCase()

export const modifiedEmail = (email: string) => {
  const firstThreeLetters = email.substring(0, 3)
  const afterAt = email.split('@')[1]
  return firstThreeLetters + '......@' + afterAt
}
export const generatePassword = () => Math.floor(Math.random() * 1000000 + 1)


export const throttle = (fn: any, ms: number) => {
  let isThrottle = false
  let savedArgs: any
  let savedThis: any

  function wrapper(this: any) {
    if (isThrottle) {
      savedArgs = arguments
      savedThis = this
      return
    }

    fn.apply(this, arguments)

    isThrottle = true

    setTimeout(() => {
      isThrottle = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = false
      }
    }, ms)
  }

  return wrapper
}

