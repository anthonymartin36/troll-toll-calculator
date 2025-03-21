import { useAuth0 } from '@auth0/auth0-react'
import { useAuthorisedRequest } from '../../useAuthorisedRequest'

export function useUserData() {
  const { user: authUser, getAccessTokenSilently } = useAuth0()

    const authorisedRequest = useAuthorisedRequest()
  
    return async () => {
      try {
        const token = await getAccessTokenSilently()
        //console.log('token : ', token)

        // Use the `authUser` object to construct the request payload
         return (await authorisedRequest)(
          'post',
          'api/v1/auth',
          JSON.stringify({
            email: authUser?.email,
            first_name: authUser?.given_name || authUser?.nickname,
            last_name: authUser?.family_name || authUser?.nickname,
            auth0_id: authUser?.sub,
          }),
          {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          }
        )
      } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
      }
    }
  }