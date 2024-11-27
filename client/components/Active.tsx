import { useState, useEffect } from 'react'
import { checkActiveBridgeApi, putActiveBridgeApi } from '../api/user'
import { useAuthContext } from './Context'
import { useQuery } from '@tanstack/react-query'
import { ActiveBridge } from '../../models/bridge'
import active from '../image/img/TrollHomeNow.png'
import notActive from '../image/img/TrollHome.png'

//https://react.dev/learn/sharing-state-between-components !!!!!


export default function Active({bridgeId} : {bridgeId: number}) { 
  const { userId } = useAuthContext()  
  const [img, setImg] = useState(notActive)

  const {
    data: activeBridgeData,
    isError,
    isLoading,
  } : {
    data: ActiveBridge | undefined 
    isError: boolean
    isLoading: boolean
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      return await checkActiveBridgeApi(userId)
    }
  })

  useEffect(() => {
    if (activeBridgeData && bridgeId === activeBridgeData.id) {
      setImg(active)
    } else {
      setImg(notActive)
    }
  }, [activeBridgeData, bridgeId])

  if (activeBridgeData === undefined) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <p>Your Trollfile cannot be found! What a massive error</p>
  }
  if (!activeBridgeData || isLoading) {
    return <p>Fetching Trollfile...</p>
  }

  const toggleInfoWindow = async () => {   
    let oldActiveBridge = await checkActiveBridgeApi(userId)

    let image = document.getElementById(`img${oldActiveBridge.id }`) as HTMLImageElement

    // get pervious active bridge
    // if (activeBridgeData?.id != oldActiveBridge.id) {
    //   console.log("Old oldActiveBridge is the same : ", oldActiveBridge)
    // }
    
    // // check if the bridge is the same
    // if(image !== null && oldActiveBridge.id !== bridgeId) {
    //   //setImg(notActive)
    //   image.src = notActive     // get the old image
    //   console.log(" activeBridge : ",  oldActiveBridge.id)
    // }   
      if (bridgeId !== oldActiveBridge.id) {
        await putActiveBridgeApi(userId, bridgeId)
        setImg(active)
    }
    console.log('END bridgeId : ', bridgeId, 'activeBridge : ', activeBridgeData.id) 
  }

  return ( 
    <div id={`${bridgeId}`}>
      <button className="active" > 
        <img 
          id={`img${bridgeId}`}
          onClick={toggleInfoWindow}
          src={`${img}`}
          alt="active" />
      </button>
    </div>
  )
}
