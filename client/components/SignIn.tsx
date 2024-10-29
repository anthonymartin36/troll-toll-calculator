import { useContext } from 'react'
import { IfNotAuthenticated } from './IsAuthenticated'
import { useAuth0 } from '@auth0/auth0-react'

export function SignIn() {
  const { user, loginWithRedirect } = useAuth0()

  function OnSignIn(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    loginWithRedirect()
  }
  
  return (
    <IfNotAuthenticated>
      <span>
        <a onClick={OnSignIn}>Sign In</a>
      </span>
    </IfNotAuthenticated>
  )
}
