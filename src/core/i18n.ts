//@ts-nocheck
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const languages = ['en', 'ru']
const lookupQuerystring = 'lang'

const detectionOptions = {
  order: ['querystring', 'navigator'],
  lookupQuerystring
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    whitelist: languages,
    fallbackLng: languages,
    defaultNS: 'translation',
    ns: ['navigation'],
    interpolation: {
      escapeValue: false
    },
    detection: detectionOptions,
    react: {
      useSuspense: false
    }
  })

i18n.on('languageChanged', () => {
  let { pathname, search } = window.location
  const queryLang = new URLSearchParams(search).get(lookupQuerystring)

  if (!!queryLang) {
    const conditionRegex:RegExp = /[&?]?(lang=\w+?&?)$|(lang=\w+&?)/gi
    search = search.replace(conditionRegex, '')

    pathname = `${pathname}${search}`
    window.history.replaceState({}, '', pathname)
  }
})

export default i18n
