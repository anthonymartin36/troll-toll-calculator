import { IfAuthenticated } from './IsAuthenticated'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import {useAuth0 } from '@auth0/auth0-react'


export default function Favourite() { //prop: bridgeId
    const [img, setImg] = useState('/img/favourite.png')
    const toggleInfoWindow = () => {
        if(img === '/img/notfavourite.png'){
            setImg('/img/favourite.png')
        } else
        setImg('/img/notfavourite.png')
    }

    // to fo that call the current api (getallfavBridiges) - and compare against Bridge ID
    // display favourite bridge if on said list

    //if customer is loged in and chooses a bridge a bridge to be a favourite
    //call the api (addFavBridge) with the bridge ID

    //also if the bridge is already a favourite, the customer can remove it from the list
    //call the api (removeFavBridge) with the bridge ID


    // toggle between two different images

    return (
        <IfAuthenticated>
            <button className="favourites">
            <img 
                onClick={toggleInfoWindow}
                src={img}
                 alt="favourite" />
            </button>
        </IfAuthenticated>
    )

}