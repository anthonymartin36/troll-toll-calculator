import { useAuth0 } from '@auth0/auth0-react'
import { getuserIdApi } from '../api/user'


export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth0()
  //console.log("user : ", user)
  return isAuthenticated
}

interface Props {
  children: React.ReactNode
}
export function IfAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}


