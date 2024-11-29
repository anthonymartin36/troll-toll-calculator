import { useState, useEffect } from 'react'
import { checkActiveBridgeApi, putActiveBridgeApi } from '../api/user'
import { useAuthContext } from './Context'
import { useQuery } from '@tanstack/react-query'
import { ActiveBridge } from '../../models/bridge'
import active from '../image/img/TrollHomeNow.png'
import notActive from '../image/img/TrollHome.png'

export default function Active({bridgeId} : {bridgeId: number}) { 
  const { userId } = useAuthContext()  
  const [img, setImg] = useState(false)

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
      setImg(true)
    } else {
      setImg(false)
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
    if (bridgeId !== oldActiveBridge.id) {
        await putActiveBridgeApi(userId, bridgeId)
        setImg(true)
    }
    console.log('END bridgeId : ', bridgeId, 'activeBridge : ', activeBridgeData.id) 
  }

  return (
    <div id={`${bridgeId}`}>
        <Image bridgeId={bridgeId} onShow={()=>toggleInfoWindow()} img={img} />
    </div>
  )
}

function Image({ bridgeId, onShow, img }: { 
  bridgeId: number;
  onShow: () => Promise<void>; 
  img: boolean }) : any {
  const [show, setShow] = useState(false)
  return ( 
    <>
    <button className="active"> 
      {img === true ? (
          <img
            id={`img${bridgeId}`}
            onClick={onShow}
            src={`${active}`}
            alt="active"
          />
      ) : (
        <img
          id={`img${bridgeId}`}
          onClick={onShow}
          src={`${notActive}`}
          alt="active"
        />
      )}
    </button>
    </>
  )
}
