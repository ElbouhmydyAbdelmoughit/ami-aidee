import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

import fr from '../../translations/fr/translation.json'
import en from '../../translations/en/translation.json'
import de from '../../translations/de/translation.json'

const getTranslations = (t: TFunction) => ({
  common: {
    back_to_home: t('common.back_to_home', "Retourner à l'accueil"),
    connection_in_progress: t(
      'common.connection_in_progress',
      'En cours de connexion..'
    ),
    coucou: t('common.coucou', 'Coucou'),
    email: t('common.email', 'Email'),
    firstname: t('common.firstname', 'Prénom'),
    forgot_password: t('common.forgot_password', 'Mot de passe oublié ?'),
    go_back: t('common.go_back', 'Retour'),
    lastname: t('common.lastname', 'Nom'),
    language: t('common.language', 'Langue'),
    loading: t('common.loading', 'Chargement...'),
    new_message: t('common.new_messages', 'New message'),
    no_response: t('common.no_response', 'Pas de réponse'),
    ok: t('common.ok', 'OK'),
    password: t('common.password', 'Mot de passe'),
    phone_number: t('common.phone_number', 'Numéro de téléphone'),
    ringing: t('common.ringing', 'Ça sonne...'),
    settings: t('common.settings', 'Paramètres'),
    to_accept: t('common.to_accept', 'Accepter'),
    to_cancel: t('common.to_cancel', 'Annuler'),
    to_continue: t('common.to_continue', 'Continuer'),
    to_confirm: t('common.to_confirm', 'Confirmer'),
    to_login: t('common.to_login', 'Se connecter'),
    to_send: t('common.to_send', 'Envoyer'),
    to_signup: t('common.to_signup', "S'inscrire"),
    to_signout: t('common.to_logout', 'Se déconnecter'),
    unknown_error: t('common.unknown_error', 'Erreur inconnue'),
    video_call: t('common.video_call', 'Appel vidéo'),
    your_email: t('common.your_email', 'Votre email'),
  },
})

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    de: {
      translation: de,
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

const t = i18n.t.bind(i18n)
let Translations = getTranslations(t)

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng)
  Translations = getTranslations(i18n.t.bind(i18n))
  console.log(lng, Translations)
}
export { i18n, t, Translations, changeLanguage }
