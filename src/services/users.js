import { methods, query, mutation } from "../utils"
import { service, authenticatedService } from "./middleware"

const { GET } = methods
/**
 * REST ROUTES
 */
const routes = {}

/**
 * GRAPHQL QUERIES
 */
const queries = {
  users: (limit, offset) => `helped_users {
    id
    firstname
    lastname
    email
    phone
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
  users: ({ limit, offset }) => query(queries.users(limit, offset)),
  createUser: user => mutation(mutations.createUser(user)),
  modifyUser: ({ id, user }) => mutation(mutations.modifyUser(id, user)),
  deleteUser: id => mutation(mutations.deleteUser(id)),
}
