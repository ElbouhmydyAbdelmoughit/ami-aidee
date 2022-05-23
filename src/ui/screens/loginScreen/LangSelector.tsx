import { Translations } from 'core/i18n'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import { connect } from 'react-redux'
import { NavigationActions, NavigationSelectors } from 'store/navigation'

const LangSelector = ({
  lang,
  changeLang,
  onRefresh,
}: {
  lang: string
  changeLang: (v: string) => void
  onRefresh: () => void
}) => {
  return (
    <View style={{ width: 120, alignSelf: 'center' }}>
      <Dropdown
        onChangeText={(text: string) => {
          changeLang(text)
          onRefresh()
        }}
        value={lang || ''}
        label={Translations.common.language}
        data={[
          {
            value: 'fr',
            label: '🇫🇷 Français',
          },
          {
            value: 'en',
            label: '🇺🇸 English',
          },
          {
            value: 'de',
            label: '🇩🇪 Deutsch',
          },
          {
            value: 'es',
            label: '🇪🇸 Español',
          },
          {
            value: 'pt',
            label: '🇵🇹 Português',
          },
          {
            value: 'nl',
            label: '🇳🇱 Nederlands',
          },
        ]}
      />
    </View>
  )
}

export default connect(
  state => ({
    lang: NavigationSelectors.getApplicationLanguage(state),
  }),
  dispatch => ({
    changeLang: (lang: string) =>
      dispatch(NavigationActions.setApplicationLanguage(lang)),
  })
)(LangSelector)
