import { call } from "redux-saga/effects"
import { methods, fetch } from "../utils"

const { POST } = methods

const routes = {
  create: () => "api/users",
}

/**
 * GRAPHQL MUTATION
 */

/**
 * SERVICES
 */
export default {
  createUser: function*(user) {
    return yield call(fetch, {
      method: POST,
      url: routes.create(),
      data: {
        email: user.email,
        password: user.password,
        username: `${user.firstname} ${user.lastname}`,
        type: "helped_user",
      },
    })
  },
}
