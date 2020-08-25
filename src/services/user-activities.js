import { authenticatedMutation } from './middleware'

const mutations = {
  createUserActivity: ({ userId, eventType }) => `mutation {
    insert_user_activities(
      objects: {
        user_id: ${userId},
        event_type: "${eventType}",
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
  createUserActivity: (...args) =>
    authenticatedMutation(mutations.createUserActivity(...args)),
}
