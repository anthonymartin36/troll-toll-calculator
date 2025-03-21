// import React, { useState, useEffect } from 'react'
// import { createContext, useContext } from 'react' // createContext
// import { checkActiveBridgeApi } from '../../api/user.ts'
// import { useAuthContext } from '../Context' 

// interface ActiveBridgeContextType {
//   activeBridgeId: number
// }

// interface Props {
//   children: React.ReactNode
// }

// export const activeBridgeContext = createContext<ActiveBridgeContextType | undefined>(undefined)

// export function useActiveBridgeContext() {
//   const context = useContext(activeBridgeContext)
//   if (context === undefined) {
//     throw new Error("activeBridgeContext must be used within a ActiveContext")
//   }
//   return context
// }

// export default function ActiveContext({ children }: Props): React.ReactElement {
//   let activeBridgeId = getActivetBridgeId() 
//   if (activeBridgeId === null || activeBridgeId === undefined) {
//     return <div>Loading...</div>;
//   }
//   const value = { activeBridgeId: activeBridgeId } // Convert userId to string or set it to null
//   return (
//     <activeBridgeContext.Provider value={value}> 
//       {children}
//     </activeBridgeContext.Provider>
//   )
// }

// function getActivetBridgeId(){
//   const { userId } = useAuthContext() 
//   const [result, setResult] = useState<number>()

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await checkActiveBridgeApi(userId)
//       setResult(data.id)
//     }
//     fetchData()
//   }, [])
  
//   return result
// }