import { methods, mutation } from '../utils'
import { service, authenticatedService, authenticatedQuery } from './middleware'

const { GET } = methods
/**
 * REST ROUTES
 */
const routes = {}

/**
 * GRAPHQL QUERIES
 */
const queries = {
  auxiliaries: ({ limit, offset, helpedUserId }) => {
    const filters =
      helpedUserId !== undefined
        ? `(where: {auxiliaries_helped_users: {helped_user_id: {_eq: ${helpedUserId}}}})`
        : ''
    return `auxiliaries${filters} {
    id
    email
    firstname
    lastname
    phone
    auxiliaries_helped_users {
      helped_user_id
    }
  }`
  },
  count: () => ` auxiliaries_aggregate {
    aggregate {
      count
    }
  }`,
}

/**
 * GRAPHQL MUTATION
 */
const mutations = {
  createAuxiliary: aux => `mutation {
    insert_auxiliaries(objects: {
      email: \"${aux.email}\"
      firstname: \"${aux.firstname}\"
      lastname: \"${aux.lastname}\"
      phone: \"${aux.phone}\"
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
  modifyAuxiliary: (id, aux) => `mutation {  
    update_auxiliaries(where: {
      id: {
        _eq: \"${id}\"
      }},
      _set: {
      email: \"${aux.email}\"
      firstname: \"${aux.firstname}\"
      lastname: \"${aux.lastname}\"
      phone: \"${aux.phone}\"
    }) {
    returning {
      id
      firstname
      lastname
      email
      phone
      updated_at
    }}
  }`,
  deleteAuxiliary: id => `mutation {  
    update_messages(where: {auxiliary_id: {_eq: ${id}}}, _set: {auxiliary_id: null}) {
      returning {
        id
      }
    }
    delete_auxiliaries(where: {
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
  auxiliaries: ({ limit, offset, helpedUserId }) => {
    return authenticatedQuery(
      queries.auxiliaries({ limit, offset, helpedUserId })
    )
  },
  createAuxiliary: aux => {
    console.log(aux)
    return mutation(mutations.createAuxiliary(aux))
  },
  modifyAuxiliary: ({ id, aux }) => {
    console.log(aux)
    return mutation(mutations.modifyAuxiliary(id, aux))
  },
  deleteAuxiliary: id => {
    console.log(id)
    return mutation(mutations.deleteAuxiliary(id))
  },
}
