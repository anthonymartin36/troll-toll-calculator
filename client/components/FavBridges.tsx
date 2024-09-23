import { getUserFavBridgeApi } from '../api/bridge'
import { useQuery } from '@tanstack/react-query'
import { Link } from "react-router-dom"
import { UserFavouriteBridge } from '../../models/favourite-bridges'

export default function FavBridges({ userID }: { userID: number }) {
    const {
        data: favbridges,
        error,
        isLoading,
      } = useQuery({
        queryKey: ['favbridges'], 
        queryFn: () => getUserFavBridgeApi(userID) } )
    
      if (error) {
        return <p>Your bridges are gone! What a massive error</p>
      }
      if (!favbridges || isLoading) {
        return <p>Fetching bridges from auckland...</p>
      }
    
    console.log('user id : ', userID)
    console.log('favbridges : ', favbridges)
    const getImageUrlsArray = import.meta.env.VITE_NODE_ENV === 'development'? 'client/' : '' 

    if(favbridges == null) {
        return (<> <p> <Link to={`/bridges`}>Get a FavBridge </Link> </p> </>)
    }
    interface FavBridge {
        id: number;
        bridgeId: number;
        userId: number;
      }
    return ( 
        <>
        <div className="right-content1">FAVORITE BRIDGE</div>
        {favbridges.map((favbridge: UserFavouriteBridge) => 
            <div key={favbridge.bridgeId}>
                <div className="favbridgeBox">
                    <div>
                        <img
                            className="favbridgeimages"
                            src={`${getImageUrlsArray}image/bridgesimg/${favbridge.imageUrl}`}
                            alt="bridge"
                        />
                    </div>
                    <button className="linkButton">
                        <Link to={`/bridge/${favbridge.bridgeId}`}>{favbridge.name}</Link>
                    </button>
                </div>
            </div>
        )}
        </>
    )
}