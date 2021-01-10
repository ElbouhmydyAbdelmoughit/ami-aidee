import { methods } from '../utils'
import { service, authenticatedQuery } from './middleware'

const { POST } = methods
const routes = {
  login: () => 'api/login',
  logout: () => 'api/logout',
  requestResetPassword: () => 'api/request_password_reset',
  resetPassword: () => 'api/reset_password',
}

/**
 * GRAPHQL QUERIES
 */
const queries = {
  me: id => `users(where: { id: { _eq: ${id} }}) {
    id
    created_at
    updated_at
    email
    username
    helped_users {
      id
      phone
      lastname
      firstname
      surname
      email
      is_charging
      waking_hour
      bedtime_hour
      sun_culmination_hour
      status
      created_at
      automatic_pickup
      min_volume
      alert_on_discharge
    }
    permission {
      id
      name
      description
    }
  }`,
}

export default {
  login: ({ email, password }) =>
    service(POST, routes.login(), { email: email, password: password }),

  logout: () => service(POST, routes.logout()),
  me: id => authenticatedQuery(queries.me(id)),
  passwordResetRequest: ({ email }) =>
    service(POST, routes.requestResetPassword(), { email, app_id: 'aide' }),
  resetPassword: ({ userId, resetCode, newPassword }) =>
    service(POST, routes.resetPassword(), {
      user_id: userId,
      reset_code: resetCode,
      password: newPassword,
    }),
  //service(POST, routes.login, JSON.stringify({email, password}), {}, {
  //  'Content-Type': 'application/json', }),
}
