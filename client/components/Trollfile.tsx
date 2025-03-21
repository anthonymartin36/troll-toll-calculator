import { useUserData } from './Hooks/getUserData'
import { createContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/users'
import { useQuery } from '@tanstack/react-query'
import { UserApi } from '../api/user'
import ActiveBridge from './ActiveBridge' 
import FavBridges from './FavBridges'

export const Context = createContext(0)

export default function Trollfile() {

  const { user: authUser } = useAuth0()
  const getUserData = useUserData()
  //const request = 
  const {
    data: user,
    isError,
    isLoading,
  }: {
    data: User | undefined
    isError: boolean
    isLoading: boolean
  } = useQuery({
    queryKey: ['user', authUser?.sub],
    queryFn: async () => UserApi(() => getUserData()),
  })

  if (isError) {
    return <p>Your Trollfile cannot be found! What a massive error</p>
  }
  if (!user || isLoading) {
    return <p>Fetching Trollfile...</p>
  }
  //const thisuser = authUser?.sub
  return (
    <>
      <h1 id="trollfile-title">My Trollfile</h1>
      <div className="body-wrapper">
        <div className="main-container">
          <div className="container">
            <div className="left-column">
              <div className="left-content"></div>
              <div className="left-content1">
                PROFILE INFO
                <div>
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
                <br />
                <div>{user.email}</div>
                <br />
              </div>
            </div>
            <div className="gap"></div>
            <div className="right-column">
              <ActiveBridge activeBridgeId={user.activeBridgeId}/>
              <FavBridges userId={user.id}/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

// async function getUserData() {
//   const { user: authUser, getAccessTokenSilently } = useAuth0()

//   // Return a callable function (authRequest)
//   // return async () => {
//   //   try {
//       const token = await getAccessTokenSilently()
//       console.log('token : ', token)
//       return await useAuthorisedRequest(
//         'post',
//         'api/v1/auth',
//         JSON.stringify({
//           email: authUser?.email,
//           first_name: authUser?.given_name || authUser?.nickname,
//           last_name: authUser?.family_name || authUser?.nickname,
//           auth0_id: authUser?.sub,
//         }),
//         {
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         }
//       )
//     // } catch (error) {
//     //   console.error('Error fetching user data:', error)
//     //   throw error
//     // }
//   // }
// }
