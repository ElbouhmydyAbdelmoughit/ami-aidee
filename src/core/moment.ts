import 'moment/locale/fr'
import 'moment/locale/de'
import 'moment/locale/pt'
import 'moment/locale/es'
import 'moment/locale/nl'

import moment from 'moment'

const setLocale = (lang: 'en' | 'fr' | 'de') => {
  moment.locale(lang)
}

export { setLocale }
export default moment
