import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { query } from 'utils/service'

/**
 * Check if the user is an helped user
 */
export const useIsHelpedUserQuery = (username: string) =>
  useQuery({
    queryKey: ['isHelpedUser', username],
    queryFn: () => {
      return query({
        queryString: `helped_users(where: {email: {_eq: "${username}"}}) {
            id
          }`,
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'myadminsecretkey',
        },
      })
    },
    select: data => {
      return !_.isEmpty(data?.[1]?.helped_users?.[0])
    },
  })
