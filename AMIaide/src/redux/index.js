import { resettableReducer } from 'reduxsauce';
import { CommonTypes } from './common';
import { AuthReducers, AuthSagas } from './auth';
import { LoaderReducers } from './loader';
import { SnackReducers, SnackSagas } from './snackBar';
import { UserReducers, UserSagas } from './user';
import { AuxiliaryReducers, AuxiliarySagas } from './auxiliaries';
import { AddressReducers, AddressSagas } from './address';
import { MessageReducers, MessageSagas } from './message';
import { TimerReducers } from './timer';

// Specify reset action type rule
const resettable = resettableReducer(CommonTypes.RESET_REDUCERS);

// Merge our redux together
const reducers = {
  auth: resettable(AuthReducers),
  loader: resettable(LoaderReducers),
  timer: resettable(TimerReducers),
  user: resettable(UserReducers),
  auxiliary: resettable(AuxiliaryReducers),
  address: resettable(AddressReducers),
  message: resettable(MessageReducers),
  snackBar: SnackReducers,
};

export const rootSaga = [
  ...AuthSagas,
  ...SnackSagas,
  ...UserSagas,
  ...AuxiliarySagas,
  ...AddressSagas,
  ...MessageSagas,
];

export default reducers;
