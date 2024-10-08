import { IfAuthenticated } from './IsAuthenticated'
import { useState, useEffect } from 'react'
import { NewFavouriteBridge } from '../../models/favourite-bridges.ts'
import { checkActiveBridgeApi, putActiveBridgeApi } from '../api/user'
import active from '../image/img/TrollHomeNow.png'
import notActive from '../image/img/TrollHome.png'

export default function Active(bridgeData: NewFavouriteBridge) { 
    const [activeBridgeId, setActiveBridgeId] = useState<number | null>(null)
    const [img, setImg] = useState(notActive)
    useEffect(() => {
      const fetchData = async () => {
        const result =  await checkActiveBridgeApi(bridgeData.userId) 
        if(bridgeData.bridgeId === result?.id)  { 
          setActiveBridgeId(result?.id)
          setImg(active)
        } 
      }
      fetchData()
    }, [bridgeData.bridgeId])
 
    const toggleInfoWindow = async () => { 
      // setImg(notActive)
      const image = document.getElementById(`img${activeBridgeId}`) as HTMLImageElement
      console.log('image : ', image ) //' active : ', active ) 
      if (image){          
        document.body.appendChild(image).src = `${notActive}`
        document.getElementById(`img${activeBridgeId}`)
      }
      if (bridgeData.bridgeId !== activeBridgeId) {
        await putActiveBridgeApi(bridgeData.userId, bridgeData.bridgeId)
        setActiveBridgeId(bridgeData.bridgeId)
        setImg(active)
      } 
    }
    
    return ( 
        <IfAuthenticated>
          <div>
            <button className="active" > 
            <img 
                id={`img${bridgeData.bridgeId}`}
                onClick={toggleInfoWindow}
                src={`${img}`}
                alt="active" />
            </button>
            </div>
        </IfAuthenticated>
    )
}