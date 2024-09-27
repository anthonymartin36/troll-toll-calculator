import { IfAuthenticated } from './IsAuthenticated'
import { useState, useEffect } from 'react'
import { NewFavouriteBridge } from '../../models/favourite-bridges.ts'
import { checkFavBridgesApi, addFavBridgeApi, removeFavBridgeApi } from '../api/bridge'
import fav from '../image/img/favourite.png'
import notFav from '../image/img/notfavourite.png'

interface bridgeProps { userId: number, bridgeId: number}
//interface favbridgeProps { userId: number, bridgeId: number}

export default function Favourite(bridgeData: NewFavouriteBridge) { 
    // if customer is logged in and display the favourite img for thei favourite bridges    

    const [img, setImg] = useState(notFav)
    useEffect(() => {
        const fetchData = async () => {
          const result =  await checkFavBridgesApi(bridgeData.userId, bridgeData.bridgeId) 
          if(bridgeData.bridgeId == result?.bridgeId)  { 
            //console.log("result : ", result.bridgeId, " bridgeData : ", bridgeData.bridgeId)
            setImg(fav)
          } 
        }
        fetchData()
      }, [bridgeData.bridgeId])

    // const toggleInfoWindow = () => img === notFav ? setImg(fav) : setImg(notFav)
    const toggleInfoWindow = async () => {
      if (img == notFav) {
        await addFavBridgeApi(bridgeData)
        setImg(fav)
      } else {
        await removeFavBridgeApi(bridgeData)
        setImg(notFav)
      }
    }

    return ( //
        <IfAuthenticated>
            <button className="favourites"  onChange={close} > 
            <img 
                onClick={toggleInfoWindow}
                src={img}
                alt="favourite" />
            </button>
        </IfAuthenticated>
    )
}


