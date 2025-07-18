export enum TrackedActivity {
  RETURN_FROM_REMINDER_LIST_ON_SCREEN_PRESS = 'return_from_reminder_list_on_screen_press',
  RETURN_FROM_REMINDER_LIST = 'return_from_reminder_list',
  TOGGLE_AUTOMATIC_PICKUP_CHECKBOX = 'toggle_automatic_pickup_checkbox',
  RETURN_FROM_USER_SETTINGS = 'return_from_user_settings',
  TOGGLE_MIN_VOLUME_SET = 'toggle_min_volume_set',
  TOGGLE_ALERT_ON_DISCHARGE = 'toggle_alert_on_discharge',
}

declare const tag: unique symbol
export type HelpedUserId = string & { readonly [tag]: 'HelpedUserId' }
export type HelpedUser = {
  firstname: string
  lastname: string
  surname?: string
  id: HelpedUserId
  automatic_pickup: boolean
  min_volume?: number
  alert_on_discharge: boolean
  is_charging: boolean
}

export type Message = {
  subjet: string
}

export type Locale = 'en' | 'fr' | 'de'

export type ReduxAction<S, Payload> = (
  state: S,
  action: Payload & { type: string }
) => S
