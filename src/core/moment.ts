import moment from 'moment'
import 'moment/locale/fr'
import 'moment/locale/de'

const setLocale = (lang: 'en' | 'fr' | 'de') => {
  moment.locale(lang)
}

export { setLocale }
export default moment
