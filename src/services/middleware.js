import { UNAUTHORIZED } from 'http-status-codes'
import { call, put, select } from 'redux-saga/effects'

import { default as AuthActions } from '../store/auth/actions'
import { fetch, mutation,query } from '../utils/index'

function* authorize(service) {
  const { jwt } = yield select(state => state.auth)
  service.headers = { ...service.headers, Authorization: `Bearer ${jwt}` }
  const [error, response] = yield call(fetch, service)

  if (error && error.response.status === UNAUTHORIZED) {
    yield put(AuthActions.logout())
    return [error]
  }

  return [error, response]
}

export function* authenticatedMutation(mutationString, headers = {}) {
  const { jwt } = yield select(state => state.auth)
  headers = { ...headers, Authorization: `Bearer ${jwt}` }
  return yield call(mutation, { mutationString, headers })
}

export function* authenticatedQuery(queryString, headers = {}) {
  const { jwt } = yield select(state => state.auth)
  headers = { ...headers, Authorization: `Bearer ${jwt}` }

  return yield call(query, { queryString, headers })
}

export function* authenticatedService(
  method,
  url,
  data = {},
  params = {},
  headers = {},
  responseType = '',
  uploadCallBack = () => {}
) {
  return yield call(authorize, {
    method,
    url,
    data,
    params,
    headers,
    responseType,
    uploadCallBack,
  })
}

export function* service(
  method,
  url,
  data = {},
  params = {},
  headers = {},
  responseType = ''
) {
  return yield call(fetch, {
    method,
    url,
    data,
    params,
    headers,
    responseType,
  })
}
