import moment from 'core/moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, Text, Title } from 'react-native-paper'

import { TRIAL_DURATION_IN_DAYS } from '../../../utils/constant'

const getIsAccountSuspended = helpedUser => {
  if (helpedUser.status === 'refused') {
    return true
  }
  return false
}

const getIsAccountExpired = helpedUser => {
  if (helpedUser.status !== 'draft') {
    return false
  }
  const createdAtObj = moment(helpedUser.created_at)
  const now = moment()
  if (now.diff(createdAtObj, 'days') >= TRIAL_DURATION_IN_DAYS) {
    return true
  }
  return false
}

let title
let firstText
let secondText

const BlockerDialog = ({ helpedUser }) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    if (getIsAccountSuspended(helpedUser)) {
      title = t('modal.account_suspended.title', 'Compte suspendu')
      firstText = t(
        'modal.account_suspended.description_1',
        "Votre compte a été suspendu. Vous n'avez désormais plus l'accès aux fonctionnalités de l'application Aidee."
      )
      secondText = t(
        'modal.account_suspended.description_2',
        "Veuillez contacter l'administrateur de l'application par email si vous pensez que ceci est une erreur."
      )
      setDialogVisible(true)
    } else if (getIsAccountExpired(helpedUser)) {
      title = t('modal.account_expired.title', 'Compte expiré')
      firstText = t(
        'modal.account_expired.description_1',
        "Vous avez dépassé les 30 jours d'essai de l'application Aidee."
      )
      secondText = t(
        'modal.account_expired.description_2',
        "Veuillez contacter l'administrateur de l'application par email pour activer votre compte & continuer l'utilisation."
      )
      setDialogVisible(true)
    } else {
      setDialogVisible(false)
    }
  }, [helpedUser])
  return (
    <Portal>
      <Dialog visible={dialogVisible}>
        <Dialog.Title>
          <Title style={{ fontSize: 24 }}>{title}</Title>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{ fontSize: 20, marginBottom: 32, marginTop: 32 }}>
            {firstText}
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 24 }}>{secondText}</Text>
          <Text style={{ fontSize: 20 }}>
            {t(
              'modal.account_expired.account_info',
              "Email de l'administrateur : ami.contact.info@gmail.com"
            )}
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default BlockerDialog
