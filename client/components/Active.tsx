import { IfAuthenticated } from './IsAuthenticated'
import { useState, useEffect } from 'react'
//import { NewFavouriteBridge } from '../../models/favourite-bridges.ts'
import { checkActiveBridgeApi, putActiveBridgeApi } from '../api/user'
import { useAuthContext } from './Context'
import active from '../image/img/TrollHomeNow.png'
import notActive from '../image/img/TrollHome.png'

export default function Active(bridgeId: any) { 
  const { userId } = useAuthContext()  
  const [activeBridgeId, setActiveBridgeId] = useState<number | null>(null)
    const [img, setImg] = useState(notActive)
    useEffect(() => {
      const fetchData = async () => {
        const result =  await checkActiveBridgeApi(userId) 
        if(bridgeId === result?.id)  { 
          setActiveBridgeId(result?.id)
          setImg(active)
        } 
      }
      fetchData()
    }, [bridgeId])
 
    const toggleInfoWindow = async () => { 
      // setImg(notActive)
      const image = document.getElementById(`img${activeBridgeId}`) as HTMLImageElement
      //console.log('image : ', image ) //' active : ', active ) 
      if (image){          
        document.body.appendChild(image).src = `${notActive}`
        document.getElementById(`img${activeBridgeId}`)
      }
      if (bridgeId !== activeBridgeId) {
        console.log('bridgeId : ', bridgeId)
        await putActiveBridgeApi(userId, bridgeId)
        setActiveBridgeId(bridgeId)
        setImg(active)
      } 
    }
    
    return ( 
        <IfAuthenticated>
          <div>
            <button className="active" > 
            <img 
                id={`img${bridgeId}`}
                onClick={toggleInfoWindow}
                src={`${img}`}
                alt="active" />
            </button>
            </div>
        </IfAuthenticated>
    )
}