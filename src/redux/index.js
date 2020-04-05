import { resettableReducer } from "reduxsauce"
import { CommonTypes } from "./common"
import { AuthReducers, AuthSagas } from "./auth"
import { LoaderReducers } from "./loader"
import { SnackReducers, SnackSagas } from "./snackBar"
import { HelpedUserReducers, HelpedUserSagas } from "./helpedUsers"
import { AuxiliaryReducers, AuxiliarySagas } from "./auxiliaries"
import { AddressReducers, AddressSagas } from "./address"
import { MessageReducers, MessageSagas } from "./message"
import { TimerReducers } from "./timer"
import { RegisterReducers, RegisterSagas } from "./register"

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
}

export const rootSaga = [
  ...AuthSagas,
  ...SnackSagas,
  ...HelpedUserSagas,
  ...AuxiliarySagas,
  ...AddressSagas,
  ...MessageSagas,
  ...RegisterSagas,
]

export default reducers
