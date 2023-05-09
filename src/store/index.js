import { resettableReducer } from 'reduxsauce'

import { AddressReducers, AddressSagas } from './address'
import { AuthReducers, AuthSagas } from './auth'
import { AuxiliaryReducers, AuxiliarySagas } from './auxiliaries'
import { CommonTypes } from './common'
import { HelpedUserReducers, HelpedUserSagas } from './helpedUsers'
import { InstantMessagesReducer,InstantMessagesSagas } from './instantMessages'
import { LoaderReducers } from './loader'
import { MessageReducers, MessageSagas } from './message'
import { NavigationReducers, NavigationSagas } from './navigation'
import { RegisterReducers, RegisterSagas } from './register'
import {
  ResetPasswordRequestReducers,
  ResetPasswordRequestSagas,
} from './resetPasswordRequest'
import { SnackReducers, SnackSagas } from './snackBar'
import { TimerReducers } from './timer'
import { UserActivitiesSagas } from './user-activities'
import { UserSagas } from './users'
import { VideoCallReducers, VideoCallSagas } from './videoCall'

// Specify reset action type rule
const resettable = resettableReducer(CommonTypes.RESET_REDUCERS)

// Merge our redux together
const reducers = {
  auth: resettable(AuthReducers),
  loader: resettable(LoaderReducers),
  timer: resettable(TimerReducers),
  user: resettable(HelpedUserReducers),
  auxiliary: resettable(AuxiliaryReducers),
  address: resettable(AddressReducers),
  message: resettable(MessageReducers),
  register: resettable(RegisterReducers),
  snackBar: SnackReducers,
  videoCall: resettable(VideoCallReducers),
  instantMessage: resettable(InstantMessagesReducer),
  navigation: NavigationReducers,
  resetPasswordRequest: resettable(ResetPasswordRequestReducers),
}

export const rootSaga = [
  ...AuthSagas,
  ...SnackSagas,
  ...HelpedUserSagas,
  ...AuxiliarySagas,
  ...AddressSagas,
  ...MessageSagas,
  ...RegisterSagas,
  ...VideoCallSagas,
  ...InstantMessagesSagas,
  ...UserSagas,
  ...UserActivitiesSagas,
  ...NavigationSagas,
  ...ResetPasswordRequestSagas,
]

export default reducers
