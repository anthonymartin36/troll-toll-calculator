import { useState } from "react"
import { Link } from "react-router-dom"


export default function ActiveBridge({ activeBridgeId }: { activeBridgeId: number | null }) {
    // select the current active bridge for the user
    // if there is no active bridge, then advise this 
    //console.log('User : ', activeBridgeId)

    if(activeBridgeId == null) {
        return (<> 
        <div className="right-content">
        <div className="activebridge"><h3>ACTIVE BRIDGE</h3></div>
        <div className="activebridge2">
        <p> No active Bridge</p>
        <Link to={`/bridges`}>Get a Bridge </Link> 
        </div>
        </div>
        </>)
    }

    return ( 
        <>
        <div className="right-content">
        <h3>ACTIVE BRIDGE</h3>
        <div className="favbridgeimage">
            <Link to={`/bridges`}>Get a Bridge </Link> 
        </div>
        </div>
        </>
    )
}