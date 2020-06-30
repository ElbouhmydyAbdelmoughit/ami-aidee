import { methods, query, mutation } from '../utils'
import {
  service,
  authenticatedQuery,
  authenticatedMutation,
} from './middleware'

const { GET } = methods
/**
 * REST ROUTES
 */
const routes = {}

/**
 * GRAPHQL QUERIES
 */
const queries = {
  users: ({ id }) => `helped_users(where: {
    id: {
      _eq: \"${id}\"
    }}) {
    id
    firstname
    lastname
    email
    phone
    status
    bedtime_hour
    waking_hour
    sun_culmination_hour
    created_at
    surname
    updated_at
    automatic_pickup
  }`,
  count: () => ` helped_users_aggregate {
    aggregate {
      count
    }
  }`,
}

/**
 * GRAPHQL MUTATION
 */
const mutations = {
  createUser: user => `mutation {
    insert_helped_users(objects: {
      email: \"${user.email}\"
      firstname: \"${user.firstname}\" 
      lastname: \"${user.lastname}\"
      phone: \"${user.phone}\"
      user_id: "${user.user_id}"
      postal_code: "${user.postalCode}"
      ${user.invitationCode ? `invitation_code: "${user.invitationCode}"` : ''}
    }) {
      affected_rows
    }
  }`,
  modifyUser: (id, user) => `mutation {
    update_helped_users(where: {
      id: {
        _eq: \"${id}\"
      }}, 
      _set: {
        ${
          typeof user.automatic_pickup === 'boolean'
            ? `automatic_pickup: ${user.automatic_pickup}`
            : ''
        }
      }) {
      returning {
        id
        firstname
        lastname
        email
        phone
        status
        bedtime_hour
        waking_hour
        sun_culmination_hour
        created_at
        surname
        updated_at
        automatic_pickup
      }
    }
  }`,
  deleteUser: id => `mutation {
    delete_helped_users(where: {
      id: {
        _eq: ${id}
      }}) {
      returning {
        id
      }
    }
  }`,
}

/**
 * SERVICES
 */
export default {
  users: filters => authenticatedQuery(queries.users(filters)),
  createUser: user => {
    const mutationQuery = mutations.createUser(user)
    return mutation({ mutationString: mutationQuery })
  },
  modifyUser: ({ id, user }) =>
    authenticatedMutation(mutations.modifyUser(id, user)),
  deleteUser: id => mutation(mutations.deleteUser(id)),
}
