import { methods, mutation } from '../utils'
import {
  authenticatedMutation,
  authenticatedQuery,
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
    is_charging
    waking_hour
    sun_culmination_hour
    created_at
    surname
    updated_at
    automatic_pickup
    min_volume
    alert_on_discharge
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
        ${
          typeof user.min_volume === 'number'
            ? `min_volume: ${user.min_volume}`
            : ''
        }
        ${
          typeof user.is_charging === 'boolean'
            ? `is_charging: ${user.is_charging}`
            : ''
        }
        ${
          typeof user.alert_on_discharge === 'boolean'
            ? `alert_on_discharge: ${user.alert_on_discharge}`
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
        is_charging
        updated_at
        automatic_pickup
        min_volume
        alert_on_discharge

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
