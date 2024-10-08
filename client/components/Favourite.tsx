import { IfAuthenticated } from './IsAuthenticated'
import { useState, useEffect } from 'react'
import { NewFavouriteBridge } from '../../models/favourite-bridges.ts'
import { checkFavBridgesApi, addFavBridgeApi, removeFavBridgeApi } from '../api/bridge'
import fav from '../image/img/favourite.png'
import notFav from '../image/img/notfavourite.png'

export default function Favourite(bridgeData: NewFavouriteBridge) { 
    const [img, setImg] = useState(notFav)
    useEffect(() => {
      const fetchData = async () => {
        const result =  await checkFavBridgesApi(bridgeData.userId, bridgeData.bridgeId) 
        if(bridgeData.bridgeId == result?.bridgeId)  { 
          setImg(fav)
        } 
      }
      fetchData()
    }, [bridgeData.bridgeId])
    const toggleInfoWindow = async () => {
      if (img == notFav) {
        await addFavBridgeApi(bridgeData)
        setImg(fav)
      } else {
        await removeFavBridgeApi(bridgeData)
        setImg(notFav)
      }
    }

    return ( 
        <IfAuthenticated>
          <div>
            <button className="favourites" > 
            <img 
                onClick={toggleInfoWindow}
                src={img}
                alt="favourite" />
            </button>
            </div>
        </IfAuthenticated>
    )
}


