import { call } from 'redux-saga/effects'
import moment from 'moment'
import { authenticatedMutation } from './middleware'

/**
 * GRAPHQL MUTATION
 */
const mutations = {
  updateReadStatus: id => `mutation {
    update_auxiliaries_helped_users(
        where: {
            id: { _eq: ${id} }
        },
        _set: {
        helped_user_last_read: "${moment().toISOString()}"
        }
    ) {
      returning {
        id
        auxiliary_id
        auxiliary_last_read
        helped_user_last_read
        helped_user_id
      }
    }
  }`,
}

const LinkService = {
  updateReadStatus: function* updateReadStatus(data) {
    const [error, response] = yield call(
      authenticatedMutation,
      mutations.updateReadStatus(data)
    )
    if (error || !response) {
      return [error, response]
    }
    return [null, response.update_auxiliaries_helped_users.returning[0]]
  },
}

export default LinkService
