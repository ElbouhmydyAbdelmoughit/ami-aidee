import React from 'react'

//export const constant = () => {

export const subjects = [
  {
    value: 'Rappel de "A FAIRE"',
  },
  {
    value: 'Prise de Medicament',
  },
  {
    value: 'Rendez-vous',
  },
]

export const moments = [
  {
    value: 'à partir de',
  },
  {
    value: 'après',
  },
]

export const reccurences = [
  { value: "aujourd'hui" }, //0
  { value: 'demain' }, //1
  { value: 'une fois par semaine' }, //2
  { value: 'tous les jours' }, //3
  { value: 'une fois par mois' }, //4
]

//}

export const AGORA_APP_ID = '2c07e05a54064384b1653247599224c5'

/**
 * Screens that enter sleep mode after SCREENSAVING_DURATION
 */
const ECO_FRIENDLY_SCREENS = ['accueil', 'home']

/**
 * Duration after which screen enters sleep mode
 */
const SCREENSAVING_DURATION = 60000 * 2
/**
 * Duration after which screen exits sleep mode
 */
const WAKEUP_DURATION = 60000 * 15

export { ECO_FRIENDLY_SCREENS, SCREENSAVING_DURATION, WAKEUP_DURATION }
