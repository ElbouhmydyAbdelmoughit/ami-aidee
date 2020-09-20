import { call } from 'redux-saga/effects'
import { query } from '../utils'

const queries = {
  requestCode: requestCode => `reset_password_requests (
      where: {
        code: { _eq: "${requestCode}" },
      }
    ) {
        id
        user_id
        code
        created_at
        status
    }`,
}

/**
 * GRAPHQL MUTATION
 */

/**
 * SERVICES
 */
export default {
  fetchByResetCode: function* fetchByResetCode(...args) {
    const [error, response] = yield call(query, {
      queryString: queries.requestCode(...args),
    })
    if (error) {
      return [error, response]
    }
    return [error, response.reset_password_requests[0]]
  },
}
