import { useAuth0 } from '@auth0/auth0-react'

export function useIsAuthenticated() {
  const { user, isAuthenticated } = useAuth0()
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
