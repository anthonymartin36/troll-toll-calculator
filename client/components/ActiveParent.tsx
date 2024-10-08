import Active from './Active'
import { useState, useEffect } from 'react'
import { NewFavouriteBridge } from '../../models/favourite-bridges'
import { checkActiveBridgeApi } from '../api/user'

export default function ActiveParent(bridgesData : NewFavouriteBridge[] ) {
    const [activeBridgeId, setActiveBridgeId] = useState<number | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
          const result =  await checkActiveBridgeApi(userId) 
          if(bridgeData.bridgeId === result?.id)  { 
            setActiveBridgeId(result?.id)
          } 
        }
        fetchData()
      }, [bridgeData.bridgeId])
    return (
    <div>
        {bridgesData.map((bridgeData) => (
            <Active
                key={bridgeData.bridgeId}
                bridgeId={bridgeData.bridgeId} // Change 'bridgeData' to 'bridgeId'
                activeBridgeId={activeBridgeId}
                setActiveBridgeId={setActiveBridgeId}
            />
        ))}
    </div>
);
}