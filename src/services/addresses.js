import { methods, query, mutation } from '../utils'
import { service, authenticatedService } from './middleware'

const { GET } = methods
/**
 * REST ROUTES
 */
const routes = {}

/**
 * GRAPHQL QUERIES
 */
const queries = {
  addresses: (limit, offset) => `addresses {
    id
    city
    address1
    address2
    country
    created_at
    updated_at
  }`,
  search: address => `addresses(where:{address1: {_like: ${address}}})  {
    id
    city
    address1
    address2
    country
    created_at
    updated_at
  }`,
  count: () => ` addresses_aggregate {
    aggregate {
      count
    }
  }`,
}

/**
 * GRAPHQL MUTATION
 */
const mutations = {
  createAddress: address => `mutation {
    insert_addresses(objects:
      {
        address1: \"${address.address1}\"
        address2: \"${address.address2}\"
        city: \"${address.city}\"
        country: \"${address.country}\"
      }) {
      returning { 
        id
        address1
        address2
        city
        country
      }
    }
  }`,
  deleteAddress: id => `mutation {
    update_auxiliaries(where: {address_id: {_eq: ${id}}}, _set: {address_id: null}) {
      returning {
        address_id
      }
    }
    update_users(where: {address_id: {_eq: ${id}}}, _set: {address_id: null}) {
      returning {
        address_id
      }
    }
    delete_addresses(where: {id: {_eq: ${id}}}) {
      returning {
        id
      }
    }
  }`,
  modifyAddress: (id, address) => `mutation {
    update_addresses(where: {
      id: {_eq: ${id}}},
      _set: {
        address1: \"${address.address1}\",
        address2: \"${address.address2}\", 
        city: \"${address.city}\", 
        country: \"${address.country}\"
      })
        {
      returning {
        id
        address1
        address2
        city
        country
      }
    }
  }`,
}

/**
 * SERVICES
 */
export default {
  addresses: ({ limit, offset }) => query(queries.addresses(limit, offset)),
  search: ({ address }) => query(queries.search(address)),
  createAddress: address => mutation(mutations.createAddress(address)),
  deleteAddress: id => mutation(mutations.deleteAddress(id)),
  modifyAddress: ({ id, address }) =>
    mutation(mutations.modifyAddress(id, address)),
}
