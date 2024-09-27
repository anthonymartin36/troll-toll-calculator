import { getBridgesApi } from '../api/bridge.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { getuserIdApi } from '../api/user'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Favourite from './Favourite' 

export default function BridgesList() { 
  const { user: authUser } = useAuth0()   
  const auth = authUser?.sub || ''// Updated to use 'authUser'
  
  const {
    data: bridges,
    error : bridgeError,
    isLoading : bridgeisLoading,
  } = useQuery({ queryKey: ['bridges'], queryFn: getBridgesApi })

  const { data: user,
    isError,
  } = useQuery({ queryKey: ['user'], queryFn: () => getuserIdApi(auth) })
  
  if (bridgeError) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || bridgeisLoading) {
    return <p>Fetching bridges from auckland...</p>
  }

  const getImageUrlsArray = import.meta.env.VITE_NODE_ENV === 'development'? 'client/' : '' 
  //console.log("Auth : ", auth)
  if(isError){
    return <p>Your Users are gone! What a massive error</p>
  }
  if (!user) {
    return <p>Fetching users...</p>
  }
  const bridgeData = { "userId": Number(user.id), "bridgeId": 1}
  
  
  return (
    <>
      <div>
        <h1 id="bridgeTitle">Bridge Locations</h1>
        <ul id="bridgeList">
          {bridges.map((bridge) => {
            bridgeData.bridgeId = Number(bridge.id)
            return (
              <li key={bridge.id}>
                <div className="bridgeBox">
                  <div>
                    <img
                      className="bridgeimages"
                      src={`${getImageUrlsArray}image/bridgesimg/${bridge.imageUrl}`}
                      alt="bridge"
                    />
                  </div>
                  <button className="linkButton">
                    <Link to={`/bridge/${bridge.id}`}>{bridge.name}</Link>
                  </button>
                  <Favourite  userId={bridgeData.userId} bridgeId={bridge.id}/>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
