import { call } from 'redux-saga/effects'

import { methods } from '../utils'
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
  latestMessages: ({ topicId }) => `instant_messages(
    order_by: {created_at: desc},
    limit: 20, 
    where: {topic_id: {_eq: "${topicId}"}}
  ) {
        id
        sender_id
        receiver_id
        created_at
        content
        topic_id
    }`,
  count: () => ` messages_aggregate {
    aggregate {
      count
    }
  }`,
  lastHelpedUsersMessages: ({ sender_ids, receiver_id }) =>
    sender_ids
      .map(
        sender_id => `
  messages_from_id_${sender_id}: instant_messages(
    order_by: {created_at: desc},
    limit: 1, 
    where: {sender_id: {_eq: ${sender_id} }, receiver_id: { _eq: ${receiver_id} }}
  ) {
      id
      sender_id
      receiver_id
      created_at
      content
      topic_id
  }
  `
      )
      .join(' '),
}

/**
 * GRAPHQL MUTATION
 */
const mutations = {
  createMessage: message => `mutation {
    insert_instant_messages(objects:{  
      sender_id: ${message.sender_id}
      receiver_id: ${message.receiver_id}
      content: \"${message.content}\"
      topic_id: ${message.topic_id}
    }) {
      returning { 
        id
        sender_id
        receiver_id
        created_at
        content
        topic_id
      }
    }
  }`,
}

/**
 * SERVICES
 */
const InstantMessagesService = {
  latestMessages: (...args) =>
    authenticatedQuery(queries.latestMessages(...args)),
  lastHelpedUsersMessages: function* lastHelpedUsersMessages(...args) {
    const [error, response] = yield call(
      authenticatedQuery,
      queries.lastHelpedUsersMessages(...args)
    )
    if (error || !response) {
      return [error, response]
    }
    return [error, Object.values(response).flat()]
  },
  createMessage: message => {
    console.log(message)
    return authenticatedMutation(mutations.createMessage(message))
  },
}

export default InstantMessagesService
