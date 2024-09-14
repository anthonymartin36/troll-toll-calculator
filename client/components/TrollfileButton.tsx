import { IfAuthenticated } from './IsAuthenticated'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function TrollfileButton() {
  const { id } = useParams()
  return (
    <IfAuthenticated>
      <span>
        <Link to={`/trollfile`}> Trollfile</Link>
      </span>
    </IfAuthenticated>
  )
}
