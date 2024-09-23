import { IfAuthenticated, IfNotAuthenticated } from './IsAuthenticated'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getUserIndFavBridgeApi } from '../api/bridge'
import fav from '../image/img/favourite.png'
import notFav from '../image/img/notfavourite.png'

export default function Favourite(bridgeId: number , userId: number) { //prop: bridgeId
    const [img, setImg] = useState(notFav)
    const toggleInfoWindow = () => img === notFav ? setImg(fav) : setImg(notFav)
    // get user id

    // if customer is logged in and display the favourite img for thei favourite bridges
    let favBridge
    if (bridgeId !== null && userId !== null) {
      const {
          data: favbridges,
          error,
          isLoading,
      } = useQuery({
          queryKey: ['favbridges'], 
          queryFn: () => getUserIndFavBridgeApi(bridgeId, userId) 
      })
      if (error) {
        return <p>Your bridges are gone! What a massive error</p>
      }
      if (!favbridges || isLoading) {
       return <p>Fetching bridges from auckland...</p>
      }
      favBridge = favbridges
    }
    //console.log('FaveBridge : ', favBridge)

    return (
        <IfAuthenticated>
            <button className="favourites">
            <img 
                onClick={toggleInfoWindow}
                src={img}
                 alt="favourite" />
            </button>
        </IfAuthenticated>
    )

}