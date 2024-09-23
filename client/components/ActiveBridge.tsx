import { useState } from "react"
import { Link } from "react-router-dom"


export default function ActiveBridge({ activeBridgeId }: { activeBridgeId: number | null }) {
    // select the current active bridge for the user
    // if there is no active bridge, then advise this 
    //console.log('User : ', activeBridgeId)

    if(activeBridgeId == null) {
        return (<> <p> <Link to={`/bridges`}>Get a Bridge </Link> </p> </>)
    }

    return ( 
        <>
        <div>Hello </div>
        </>
    )
}