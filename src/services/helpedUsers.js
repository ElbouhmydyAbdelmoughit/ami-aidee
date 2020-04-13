import { methods, query, mutation } from '../utils'
import { service, authenticatedQuery } from './middleware'

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
        email: \"${user.email}\"
        firstname: \"${user.firstname}\" 
        lastname: \"${user.lastname}\"
        phone: \"${user.phone}\"
    }) {
      returning {
        id
        firstname
        lastname
        email
        phone
        updated_at
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
  users: filters =>
    console.log(filters) || authenticatedQuery(queries.users(filters)),
  createUser: user => {
    const mutationQuery = mutations.createUser(user)
    return mutation({ mutationString: mutationQuery })
  },
  modifyUser: ({ id, user }) => mutation(mutations.modifyUser(id, user)),
  deleteUser: id => mutation(mutations.deleteUser(id)),
}
