import React, { useState, useEffect } from 'react'
import { createContext, useContext } from 'react' // createContext
import { useAuth0 } from '@auth0/auth0-react'
import { getUserIdApi } from '../api/user'

interface AuthContextType {
  userId: number
}

export const authContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

export function useAuthContext() {
  const context = useContext(authContext)
  if (context === undefined) {
    throw new Error("authContext must be used within a AuthProvider")
  }
  return context
}

export default function AuthProvider({ children }: Props): React.ReactElement  {
  let userId = getCurrentUserId()   // Set default value of 0 if userId is null
     //console.log("Context user.id : ", userId)
  if (userId === null || userId === undefined) {
    return <div>Loading...</div>;
  }
  const value = { userId: userId } // Convert userId to string or set it to null
  return (
     <authContext.Provider value={value}> 
      {children}
    </authContext.Provider>
  )
}

function getCurrentUserId(){
  const { user: authUser } = useAuth0()
  const [result, setResult] = useState<number>()

  if (!authUser || !authUser.sub) {
    console.error("authUser or authUser.sub is undefined")
    return null
  }

  const sub = authUser.sub
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserIdApi(sub)
      setResult(data.id)
    }
    fetchData()
  }, [])

  return result
}

// const { data: user, isError, isLoading, error } = useQuery({
  //   queryKey: ['user', sub],
  //   queryFn: () => getuserIdApi(sub),
  //   onError: (err) => console.error("Error fetching user data:", err),
  // })

  // if (isLoading) {
  //   console.log("Fetching userId ...")
  //   return <div>Loading...</div> // You can replace this with a loading spinner or any other loading indicator
  // }

  // if (isError) {
  //   console.error("Your userId cannot be found! What a massive error", error)
  //   return <div>Error loading user data</div> // You can replace this with an error message or component
  // }

  // if (!user) {
  //   console.error("User data is undefined")
  //   return null;
  // }