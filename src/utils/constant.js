// export const constant = () => {

import { t, Translations } from 'core/i18n'

export const getSubjects = () => [
  {
    value: t('common.subject_to_do', 'Rappel de "A FAIRE"'),
  },
  {
    value: t('common.subject_pill', 'Prise de Medicament'),
  },
  {
    value: t('common.subject_meeting', 'Rendez-vous'),
  },
]

export const getMoments = () => [
  {
    value: Translations.common.from,
  },
  {
    value: Translations.common.after,
  },
]

export const getRecurrences = () => [
  { value: "aujourd'hui", label: Translations.common.today }, // 0
  { value: 'demain', label: Translations.common.tommorrow }, // 1
  { value: 'une fois par semaine', label: Translations.common.once_a_week }, // 2
  { value: 'tous les jours', label: Translations.common.everyday }, // 3
  { value: 'une fois', label: Translations.common.one_time }, // 4
]
// }

export const AGORA_APP_ID = '2c07e05a54064384b1653247599224c5'

const MINUTE_TO_MS = 60000

/**
 * Duration after which screen enters sleep mode
 */
const SCREENSAVING_DURATION = 0.5 * MINUTE_TO_MS
/**
 * Duration after which screen exits sleep mode
 */
const WAKEUP_DURATION = 15 * MINUTE_TO_MS
/**
 * Duration after which user returns to solar screen
 */
const RETURN_TO_HOME_DURATION = 1 * MINUTE_TO_MS

export { RETURN_TO_HOME_DURATION, SCREENSAVING_DURATION, WAKEUP_DURATION }

export const TRIAL_DURATION_IN_DAYS = 30
