import { getBridgesApi } from '../api/bridge.ts'
import { IfAuthenticated } from './IsAuthenticated'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Favourite from './Favourite' 
import Active from './Active'
import AuthProvider from './Context'

export default function BridgesList() { 

  const getImageUrlsArray = import.meta.env.VITE_NODE_ENV === 'development'? 'client/' : '' 
  const {
    data: bridges,
    error : bridgeError,
    isLoading : bridgeisLoading,
  } = useQuery({ queryKey: ['bridges'], queryFn: getBridgesApi })

  if (bridgeError) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || bridgeisLoading) {
    return <p>Fetching bridges from auckland...</p>
  }
  
  const bridgeData = { "bridgeId": 1} 

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
                  <IfAuthenticated>
                    <AuthProvider>
                      <Favourite bridgeId={bridge.id} />
                      <Active bridgeId={bridge.id} />
                    </AuthProvider>
                  </IfAuthenticated>
                  <button className="linkButton">
                    <Link to={`/bridge/${bridge.id}`}>{bridge.name}</Link>
                  </button>

                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
