import { getBridgesApi } from '../api/bridge.ts'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Favourite from './Favourite' 

export default function BridgesList() {
  const {
    data: bridges,
    error,
    isLoading,
  } = useQuery({ queryKey: ['bridges'], queryFn: getBridgesApi })

  if (error) {
    return <p>Your bridges are gone! What a massive error</p>
  }
  if (!bridges || isLoading) {
    return <p>Fetching bridges from auckland...</p>
  }
  const getImageUrlsArray = import.meta.env.VITE_NODE_ENV === 'development'? 'client/' : '' 

  return (
    <>
      <div>
        <h1 id="bridgeTitle">Bridge Locations</h1>
        <ul id="bridgeList">
          {bridges.map((bridge) => {
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
                  <Favourite />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
