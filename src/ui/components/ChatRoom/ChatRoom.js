import React, { useEffect, useCallback } from 'react'
import 'dayjs/locale/fr'
import 'dayjs/locale/en'
import 'dayjs/locale/de'

import { View, Text } from 'react-native'
import {
  GiftedChat,
  InputToolbar,
  Send,
  Composer,
  MessageText,
} from 'react-native-gifted-chat'
import { Avatar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Translations } from 'core/i18n'
import { NavigationSelectors } from 'store/navigation'
import { useSelector } from 'react-redux'
import { getUserAbbr, getUserDisplayName } from '../../../utils/user'

const messageTransformer = serverFormatMessage => ({
  text: serverFormatMessage.content,
  createdAt: serverFormatMessage.created_at,
  _id: serverFormatMessage.id,
  user: {
    _id: serverFormatMessage.sender_id,
  },
})

const ChatRoom = ({
  auxiliary,
  currentUserId,
  sendMessage,
  messagesRequest,
  messages,
  onAction,
}) => {
  useEffect(() => {
    messagesRequest()
  }, [])

  const { t } = useTranslation()
  const onSend = useCallback((newMessages = []) => {
    sendMessage(newMessages[0].text)
    onAction()
  }, [])
  const lang = useSelector(NavigationSelectors.getApplicationLanguage)
  return (
    <GiftedChat
      messages={messages.map(messageTransformer)}
      onSend={onSend}
      locale={lang}
      user={{
        _id: currentUserId,
      }}
      isKeyboardInternallyHandled={false}
      onInputTextChanged={() => {
        onAction()
      }}
      renderAvatar={() => {
        return (
          <View style={{ width: 35 }}>
            <Avatar.Text
              size={35}
              label={getUserAbbr(auxiliary)}
              style={{
                backgroundColor: '#15E6CD',
              }}
              color="white"
            />
          </View>
        )
      }}
      renderChatEmpty={() => {
        return (
          <View
            style={{
              marginTop: 48,
              // https://github.com/FaridSafi/react-native-gifted-chat/issues/1557
              transform: [{ scaleY: -1 }],
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}
            >
              {t('screen.chat.begin_conversation', {
                defaultValue: ' Commencez la conversation avec {{name}}',
                name: getUserDisplayName(auxiliary),
              })}
            </Text>
          </View>
        )
      }}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: 'rgb(255,255,255)',
            borderRadius: 16,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginTop: 16,
            borderTopWidth: 0,
          }}
          primaryStyle={{ alignItems: 'center' }}
        />
      )}
      renderComposer={props => (
        <Composer
          {...props}
          placeholder={t('screen.chat.input_placeholder', 'Envoyer un message')}
          textInputStyle={{
            fontSize: 24,
            lineHeight: 32,
          }}
          composerHeight={48}
        />
      )}
      renderSend={props => (
        <Send
          {...props}
          disabled={!props.text}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              marginRight: 8,
              color: '#0084ff',
              textTransform: 'uppercase',
            }}
          >
            {Translations.common.to_send}
          </Text>
        </Send>
      )}
      renderFooter={() => <View style={{ height: 8 }} />}
      renderMessageText={props => (
        <MessageText
          {...props}
          textStyle={{
            left: { fontSize: 24, lineHeight: 24 },
            right: { fontSize: 24, lineHeight: 24 },
          }}
        />
      )}
    />
  )
}
export default ChatRoom
