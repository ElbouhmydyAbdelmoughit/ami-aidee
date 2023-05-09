import { call } from 'redux-saga/effects'

import { fetch,methods } from '../utils'
import { authenticatedMutation,authenticatedQuery } from './middleware'

const { POST } = methods

const routes = {
  create: () => 'api/users',
}

const queries = {
  regTokens: ({ userId, token }) => `
  user_google_reg_tokens(
    where: {
      user_id: {_eq: ${userId} }, 
      token: {_eq: "${token}"}
    }
  ) {
    id
    user_id
    created_at
  }
  `,
}

const mutations = {
  createRegToken: ({ userId, token, os }) => `mutation {
    insert_user_google_reg_tokens(
      objects: {
        user_id: ${userId},
        token: "${token}",
        os: "${os}"
      }
    ) {
      returning {
        id
      }
    }
  }`,
}

/**
 * GRAPHQL MUTATION
 */

/**
 * SERVICES
 */
export default {
  createUser: function* createUser(user) {
    return yield call(fetch, {
      method: POST,
      url: routes.create(),
      data: {
        email: user.email,
        password: user.password,
        username: `${user.firstname} ${user.lastname}`,
        type: 'helped_user',
      },
    })
  },
  regToken: (...args) => authenticatedQuery(queries.regTokens(...args)),
  createRegToken: (...args) =>
    authenticatedMutation(mutations.createRegToken(...args)),
}
