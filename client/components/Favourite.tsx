import { useState, useEffect } from 'react'
import { checkFavBridgesApi, addFavBridgeApi, removeFavBridgeApi } from '../api/bridge'

import fav from '../image/img/favourite.png'
import notFav from '../image/img/notfavourite.png'
import { useAuthContext } from './Context'  


export default function Favourite({bridgeId}: {bridgeId: number})  { 
    const { userId } = useAuthContext() 
    const favourite = { userId: userId, bridgeId: bridgeId }
    const [img, setImg] = useState(notFav)
    useEffect(() => {
      const fetchData = async () => {
        const result = await checkFavBridgesApi(bridgeId, userId) 
        result?.bridgeId ? setImg(fav) : setImg(notFav)
      }
      fetchData()
    }, [])

    const toggleInfoWindow = async () => {
      if (img == notFav) {
        //console.log("addFavBridgeApi bridge : ", favourite.bridgeId.bridgeId)
        await addFavBridgeApi(favourite)
        setImg(fav)
      } else {
        await removeFavBridgeApi(favourite)
        setImg(notFav)
      }
    }

    return ( 
          <div id={`${bridgeId}`}>
            <button className="favourites" > 
            <img 
                onClick={toggleInfoWindow}
                src={img}
                alt="favourite" />
            </button>
            </div>
    )
}


