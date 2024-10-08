import { IfAuthenticated } from './IsAuthenticated'
import { useEffect } from 'react'
import { NewFavouriteBridge } from '../../models/favourite-bridges.ts'
import { checkActiveBridgeApi, putActiveBridgeApi } from '../api/user'
import active from '../image/img/TrollHomeNow.png'
import notActive from '../image/img/TrollHome.png'

export default function ActiveChild({ bridgeData, activeBridgeId, setActiveBridgeId }: ActiveProps) { 
    useEffect(() => {
      const fetchData = async () => {
        const result =  await checkActiveBridgeApi(bridgeData.userId) 
        if(bridgeData.bridgeId === result?.id)  { 
          setActiveBridgeId(result?.id)
        } 
      }
      fetchData()
    }, [bridgeData.bridgeId, setActiveBridgeId])
  
    const toggleInfoWindow = async () => {
      if (bridgeData.bridgeId !== activeBridgeId) {
        await putActiveBridgeApi(bridgeData.userId, bridgeData.bridgeId)
        setActiveBridgeId(bridgeData.bridgeId)
      }  
    }
  
    return ( 
      <IfAuthenticated>
        <div>
          <button className="active" onChange={close} > 
          <img 
              id={`${bridgeData.bridgeId}`}
              onClick={toggleInfoWindow}
              src={bridgeData.bridgeId === activeBridgeId ? active : notActive}
              alt="active" />
          </button>
        </div>
      </IfAuthenticated>
    )
  }
  
  interface ActiveProps extends NewFavouriteBridge {
    bridgeData: NewFavouriteBridge
    activeBridgeId: number | null
    setActiveBridgeId: React.Dispatch<React.SetStateAction<number | null>>;

  }