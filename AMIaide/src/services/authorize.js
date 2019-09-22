import { fetch, methods } from '../utils';

const {POST} = methods;
const routes = {
  refresh: '/refresh',
};

export default {
  refreshTokens: token => fetch({
    method: POST,
    url: routes.refresh,
    data: {},
    params: {},
    headers: {Authorization: `Bearer ${token}`},
  }),
};
