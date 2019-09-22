import { methods, query, mutation } from '../utils';
import { service, authenticatedService, authenticatedQuery } from './middleware';

const { GET } = methods;
/**
 * REST ROUTES
 */
const routes = {
};

/**
 * GRAPHQL QUERIES
 */
const queries = {
  messageBetween: (startDate, endDate) => `messages(where: {diffusion_end_date: {_gte: "${startDate}"}, _and: {diffusion_start_date: {_lte: "${endDate}"}}}) {
    id
    subjet
    activite
    location
    moment
    moment_time
    reccurence
    updated_at
    created_at
    diffusion_start_date
    diffusion_end_date
    picture_url
    video_url
    auxiliary {
      id
      firstname
      lastname
    }
    }`,
  messages: (limit, offset) => `messages {
    id
    subjet
    activite
    location
    moment
    moment_time
    reccurence
    updated_at
    created_at
    diffusion_start_date
    diffusion_end_date
    picture_url
    video_url
    auxiliary {
      id
      firstname
      lastname
    }
  }`,
  count: () => ` messages_aggregate {
    aggregate {
      count
    }
  }`
}

/**
 * GRAPHQL MUTATION
 */
const mutations = {
  createMessage: message => `mutation {
    insert_messages(objects:{  
      auxiliary_id: ${message.auxiliary_id}
      helped_user_id: ${message.helped_user_id}
      activite: \"${message.activite}\"
      subjet: \"${message.subjet}\"
      diffusion_start_date: \"${message.diffusion_start_date}\"
      diffusion_end_date: \"${message.diffusion_end_date}\"
      location: \"${message.location}\"
      moment: \"${message.moment}\"
      moment_time: \"${message.moment_time}\"
      picture_url: \"${message.picture_url}\"
      video_url: \"${message.video_url}\"
    }) {
      returning { 
        id
    subjet
    activite
    location
    moment
    moment_time
    reccurence
    updated_at
    created_at
    diffusion_start_date
    diffusion_end_date
    picture_url
    video_url
    auxiliary {
      id
      firstname
      lastname
    }
    helped_user {
      id
      firstname
      lastname
    }
      }
    }
  }`
}

/**
 * SERVICES
 */
export default {
  messageBetween: ({startDate, endDate}) => authenticatedQuery(queries.messageBetween(startDate, endDate)),
  messages: ({ limit, offset }) => authenticatedQuery(queries.messages(limit, offset)),
  createMessage: message => { console.log(message); return mutation(mutations.createMessage(message)) },
};