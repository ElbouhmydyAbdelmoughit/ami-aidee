import { methods, loginFetchMock, fetch } from '../utils';
import { service, authenticatedQuery } from './middleware';

const {POST} = methods;
const routes = {
  login: () => 'api/login',
};

/**
 * GRAPHQL QUERIES
 */
const queries = {
  me: (limit, offset) => ` users {
    id
    created_at
    updated_at
    email
    username
    helped_users {
      id
      phone
      lastname
      firstname
      email
    }
    permission {
      id
      name
      description
    }
  }`,
}

export default {
  login: ({email, password}) => service(
    POST, routes.login(), {email: email, password: password}),
  me: () => authenticatedQuery(queries.me()),
    //service(POST, routes.login, JSON.stringify({email, password}), {}, {
    //  'Content-Type': 'application/json', }),
};
