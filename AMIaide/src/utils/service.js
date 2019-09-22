/* Service utils */
import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

import { Env } from 'src/utils/env'

/** GRAPHQL */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient, { gql } from 'apollo-boost';
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
console.log(Env)
const client = new ApolloClient({
  uri: Env.GRAPHQL_URL,
  link: new HttpLink(),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

/** GRAPHQL - MUTATION */
export const mutation = ({ mutationString, headers = {} }) =>
  client.mutate({
    mutation: gql`${mutationString}`,
    fetchPolicy:'network-only',
    context: {
      headers: headers
    }
  })
    .then(({ data: response }) => {
      return Promise.all([null, response]);
    })
    .catch(error => {
      return Promise.resolve([error]);
    });


/** GRAPHQL - QUERY */
export const query = ({ queryString, headers = {} }) =>
  client.query({
    query: gql`{${queryString}}`,
    fetchPolicy:'network-only',
    context: {
      headers: headers
    }
    // ... other options  
  })
    .then(({ data: response }) => {
      return Promise.all([null, response]);
    })
    .catch(error => {
      return Promise.resolve([error]);
    });

/** Method types */
export const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const fetch = (
  {
    method,
    url,
    data = {},
    params = {},
    headers = {},
    responseType,
    uploadCallBack = (e) => {
    },
  }) => {

    console.log(`${method}: ${Env.API_URL} ${url}`)
  let instance = axios.create();
  instance.interceptors.request.use(AxiosLogger.requestLogger);

  instance.interceptors.response.use(AxiosLogger.responseLogger, (err) =>{
    // write down your error intercept.
    console.log(err);
    return AxiosLogger.errorLogger(err);
});


  instance.defaults.headers.common = {};
  const {cancelToken} = params;
  delete params.cancelToken;

  return instance({
    baseURL: Env.API_URL,
    method: method,
    url: url,
    data: data,
    params: params,
    cancelToken: cancelToken,
    responseType,
    headers: {...headers,
      'Access-Control-Allow-Origin': '*',
      //"User-Agent": "PostmanRuntime/7.15.0",
      "Accept":"*/*",
      //"Cache-Control":"no-cache",
      //"Postman-Token":"d09afd28-67b6-41e7-8425-cfdfce9fca59",
      //"Host":"platform.dietea.fr",
      //"cookie":"XSRF-TOKEN=eyJpdiI6IkJUKzZ2NzhUc240NFBqTjdwZWdRcmc9PSIsInZhbHVlIjoiTCtqWUpXYU1QZDZNSVQzR3BTbW40NEIybHM5NmE4TWVDeDlFZkxGWFRJclk5ZGpLa1dNbVN0UElPeWxLK2drTyIsIm1hYyI6Ijg5NWU0YWMyN2Q1NGIxN2JkMmE1MjFlMzYwYmQ4MjA0YTBiZTZiNmM5MmIyZDYxYTFkZjNjNjdhMDBjNjEwNDEifQ%3D%3D; ortuno_session=eyJpdiI6IjNCSjNXT3Jock5XSnFVTzhKSGhseGc9PSIsInZhbHVlIjoiQUxFWkNhWXFMVDBSWWtnSkVabW9iZXhjODVWR2xxZTRyZk82ckhVYXR5OXhtTE1Ed0xSc3VUWDZsWDZhaVNyeiIsIm1hYyI6Ijk0MTRjODdiYTAwYmE5M2RhYWEzYjM5YWJiMGYwMzBiZTlkOWViMzI1OTZlMTRhMDg2NzE5OTEwYzM5NDgwMzMifQ%3D%3D; refreshToken=eyJpdiI6IlIxRGpkUEVzQ21KRkgrZUZNNHVINUE9PSIsInZhbHVlIjoiaVFmXC9EZjZBTERkV04wNlRhVmdQRENTXC9LcUVyRFJGWlZPc1BIMTBxOEMrQXlVNG5UcllKTjNFalFzZ2hBVFFXK3BJYnpGWmlrQ0NJU2wxZU52K010NFwvbTFkdHhQeW5SZHQ3SkpUNE1ucGowdk9tQlNNbVVVOU82N3VWdFA3Wno4aWtRZnlvUzdnM1EwWEQ3XC9CK0NcL2VvQmV5eXhlSjNEUGNya3hSeW1zYkkzTU8xVENFcTJHZ1wvRmFJaDNqZU1paDFGd05JbE95VGVjUWdEaVdnVnF2ZzhWaHM1UVRpVUVXbGJGaHFYMU1ERjY4RGJucVd5TzVWd1B4S2NkcVBidGdVMW5WR3I3elhNRGlsUWZ1NGN5ZXZpdGI0NUxTS3FTY1RkbFZ0MEJBZlRiTmpNWm9CbHBKU1RUc1B3d0NYZ0d1TDcwdkZzOGtCa3BmOTUwelJrcExXZUZaUEZVZGIrbDc2a3dva2R2SmJBdGQ3anBxRjAyXC9qUlJ3bFwvWmRrRXozN00yeW1qTVlQN0ducEI5ZE55NXpXVlZWZ2x6YnZ1YU1SaUd0WU5NdW1hTGNwaWdrZDFwZ0NHeDdHcDdOOW9MK2xYQ3ZqeCtHSzJHYjN4cHBUR2NiS05lRGxBMHJORlpPbGYzYTlOZFBpSVZoWG1MWVhtMWlFcXd3bHRseEFuVVo3NFNQRHgyRFBXb0hWNU1SRWl5M1ZuTnBGdG4zYTMwTm91WUJOXC9ZNUxmRzFEdDBNclwveXRxM1wvZVpPZUNya2xnTnZHNmZwQ0hNcXdWMHQ0VCtCeitMMWc3UnZJY0wzcENcL3p1SUlkbGRtY3BJUTFQcFJoZ0VXWlFFQVVCWlhkTkFFRSttbHlFaDltcmtPdHJ5M2hucUIxcjR5NlIzSWJ5ZnVGdlNpazFzd1c0dVoyZFwvNWN5cHlGNVR6SlFwU1NleHNwek5mTzF5TFhOaTN5alwvY293Y0hhSXFscERQZUNINUJHRjF2cWhTdVhrNVJqNkxVUXNNYllQZmhxdWlFXC9xUDl6UkZvTVBpTkNiQXp5UUdMOExLdERPRFNZRFwvMDdkVTNDd1pyOU5yUklXY1dtQjhxMk1YUjlSYWtIVnJ1bW52STJlMFoxTjFhRmpPRGZZaWVxYVJzNXl5aTBYQnlOWVl4SlJ6TjFBR1FDTHlsYWIrc3pNcjNaRmQwK0U2eEtXcHh0QzRYUEhqMjlINHNURUQxajh4UHZFejRJVFFzZGo0SHBTMndLZFwvWUpuSVJxU1RoVjJLSngzS3I4RHhLQ3YiLCJtYWMiOiI3NjEyOTEyMmFjODQ0NjU1MDYyNDg4OTMxN2ZmNWFjNjQ0ZmRhYjlmZWFjZjcyYTI4ZGM1N2Y2NGQxYjRiMmNmIn0%3D; SERVERID68971=2620176|XSRnk|XSRkk",
      //"accept-encoding":"gzip, deflate",
      //"content-length":29
    },
    onUploadProgress: progressEvent => uploadCallBack(progressEvent),
  }, { crossdomain: true })
    .then(response => {
      return Promise.all([null, response]);
    })
    .catch(error => {
      // Fix proposed by TNU when error.response = undefined (for NetworkError)
      if (error.response) {
        return Promise.resolve([error]);
      }
      return Promise.resolve([{response: {status: 500}}]);
    });
};

/** FILE */
export const fileFromObjectURL = (objectURL) => {
  return axios({
    method: 'get',
    url: objectURL, // blob url eg. blob:http://127.0.0.1:8000/e89c5d87-a634-4540-974c-30dc476825cc
    responseType: 'blob'
})/*.then(function(response){
     var reader = new FileReader();
     reader.readAsDataURL(response.data); 
     reader.onloadend = function() {
         var base64data = reader.result;
         self.props.onMainImageDrop(base64data)
     }

})*/
}