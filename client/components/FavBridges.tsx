import { getUserFavBridgeApi } from '../api/bridge'
import { useState, useEffect} from 'react'
//import { useQuery } from '@tanstack/react-query'
import { Link } from "react-router-dom"

import { UserFavouriteBridge } from '../../models/favourite-bridges'

export default function FavBridges({ userId }: { userId: number }) {
    //console.log( 'user_id : ', userId)

    const [result, setResult] = useState<UserFavouriteBridge[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const data =  await getUserFavBridgeApi(userId) 
        setResult(data)
      }
      fetchData()
    }, [userId])

    const getImageUrlsArray = import.meta.env.VITE_NODE_ENV === 'development'? 'client/' : '' 

    return ( 
        <>
        <div className="right-content1">
        <div className="favbridgeheader"><h3>FAVORITE BRIDGE</h3> <br /></div>
        <div className="favbridgeimages">
        {result.map(FavBridge => (
            <div className="favbridgeimage" key={Number(FavBridge.bridgeId)}>
                <Link to={`/bridge/${FavBridge.bridgeId}`}>
                    
                    <img
                        className="favbridgeimage1" 
                        src={`${getImageUrlsArray}image/bridgesimg/${FavBridge.imageUrl}`}
                        alt={`${FavBridge.name}`} /> {FavBridge.name}
                </Link>
            </div>
        ))}
        </div>
        </div>
        </>
    )
}
