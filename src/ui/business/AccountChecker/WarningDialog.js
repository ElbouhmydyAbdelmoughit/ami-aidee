import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'core/moment'
import { Dialog, Portal, Text, Button } from 'react-native-paper'
import { TRIAL_DURATION_IN_DAYS } from '../../../utils/constant'
import {
  NavigationActions,
  NavigationSelectors,
} from '../../../store/navigation'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'

const getAccountExpiresIn = helpedUser => {
  if (!helpedUser) {
    return false
  }
  if (helpedUser.status !== 'draft') {
    return false
  }
  const createdAtObj = moment(helpedUser.created_at)
  const now = moment()
  return TRIAL_DURATION_IN_DAYS - now.diff(createdAtObj, 'days')
}

let title
let firstText
let secondText

const WarningDialog = ({
  helpedUser,
  expirationIn5DaysDisplayed,
  expirationIn10DaysDisplayed,
  isExpirationIn5DaysExpired,
  isExpirationIn10DaysExpired,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    console.log('hihi')
    const accountExpiresIn = getAccountExpiresIn(helpedUser)

    if (
      5 < accountExpiresIn &&
      accountExpiresIn <= 10 &&
      !isExpirationIn10DaysExpired
    ) {
      title = t('modal.expiring_soon.title', "Bientôt la fin pour l'essai")
      firstText = t('modal.expiring_soon.description_1', {
        defaultValue:
          "Votre compte prendra fin de la période d'essai dans {{accountExpiresIn}} jours. Vous n'aurez bientôt plus l'accès aux fonctionnalités de l'application Aidé.",
        accountExpiresIn,
      })
      secondText = t(
        'modal.expiring_soon.description_2',
        "Veuillez contacter l'administrateur de l'application afin d'activer votre compte & continuer l'utilisation."
      )
      setDialogVisible(true)
      expirationIn10DaysDisplayed()
    } else if (
      0 < accountExpiresIn &&
      accountExpiresIn <= 5 &&
      !isExpirationIn5DaysExpired
    ) {
      title = t(
        'modal.expiring_soon_2.title',
        "Dernier rappel avant l'expiration"
      )
      firstText = t('modal.expiring_soon.description_1', {
        defaultValue:
          "Votre compte prendra fin de la période d'essai dans {{accountExpiresIn}} jours. Vous n'aurez bientôt plus l'accès aux fonctionnalités de l'application Aidé.",
        accountExpiresIn,
      })
      secondText = t(
        'modal.expiring_soon.description_2',
        "Veuillez contacter l'administrateur de l'application afin d'activer votre compte & continuer l'utilisation."
      )
      setDialogVisible(true)
      expirationIn5DaysDisplayed()
    } else {
      setDialogVisible(false)
    }
  }, [helpedUser])
  return (
    <Portal>
      <Dialog visible={dialogVisible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={{ marginBottom: 64, textAlign: 'left' }}>
            {firstText}
          </Text>
          <Text style={{ marginBottom: 24 }}>{secondText}</Text>
          <Text style={{ marginBottom: 24 }}>
            {t(
              'modal.account_expired.account_info',
              "Email de l'administrateur : ami.contact.info@gmail.com"
            )}{' '}
          </Text>
          <Button
            onPress={() => {
              setDialogVisible(false)
            }}
            mode="contained"
          >
            {Translations.common.ok}
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default connect(
  state => ({
    isExpirationIn5DaysExpired: NavigationSelectors.isExpirationIn5DaysExpired(
      state
    ),
    isExpirationIn10DaysExpired: NavigationSelectors.isExpirationIn10DaysExpired(
      state
    ),
  }),
  dispatch => ({
    expirationIn10DaysDisplayed: () =>
      dispatch(NavigationActions.expirationIn10DaysWarningDisplayed()),
    expirationIn5DaysDisplayed: () =>
      dispatch(NavigationActions.expirationIn5DaysWarningDisplayed()),
  })
)(WarningDialog)
