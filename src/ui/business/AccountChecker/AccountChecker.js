import React, { useEffect, useState } from "react"
import moment from "moment"
import { View } from "react-native"
import { Dialog, Portal, Text, Title, Divider } from "react-native-paper"

const getIsAccountSuspended = helpedUser => {
  if (helpedUser.status === "refused") {
    return true
  }
  return false
}

const getIsAccountExpired = helpedUser => {
  if (helpedUser.status !== "draft") {
    return false
  }
  const createdAtObj = moment(helpedUser.created_at)
  const now = moment()
  if (now.diff(createdAtObj, "days") >= 30) {
    return true
  }
  return false
}

let title, firstText, secondText
const AccountChecker = ({ helpedUser }) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  useEffect(() => {
    if (getIsAccountSuspended(helpedUser)) {
      title = "Compte suspendu"
      firstText =
        "Votre compte a été suspendu. Vous n'avez désormais plus l'accès aux fonctionnalités de l'application Aidee."
      secondText =
        "Veuillez contacter l'administrateur de l'application par email si vous pensez que ceci est une erreur."
      setDialogVisible(true)
    } else if (getIsAccountExpired(helpedUser)) {
      title = "Compte expiré"
      firstText =
        "Vous avez dépassé les 30 jours d'essai gratuit de l'application Aidee."
      secondText =
        "Veuillez contacter l'administrateur de l'application par email pour activer votre compte & continuer l'utilisation."
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
          <Text style={{ fontSize: 20, marginBottom: 64, marginTop: 32 }}>
            {firstText}
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 24 }}>{secondText}</Text>
          <Text style={{ fontSize: 20 }}>
            Email de l'administrateur : amidev2020@gmail.com
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default AccountChecker
