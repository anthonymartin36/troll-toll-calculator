import connection from './connection'
import { User, AuthUser } from '../../models/users'

export async function getUser(
  authUser: AuthUser,
  db = connection
): Promise<User> {
  // Get user if existing
  
  //sleep(10000) awaiting auth0_id to be defined
  if (!authUser.auth0_id){
    throw new Error('auth0_id is undefined')
  }
  const user = await db('users')
    .select('id', 
      'active_bridge_id as activeBridgeId', 
      'first_name as firstName', 
      'email', 
      'last_name as lastName', 
      'auth0_id as auth0Id')
    .where('auth0_id', authUser.auth0_id )
    .first()
    
    //console.log("User : ", user)
    return user
}

export async function getActiveBridge(userId: number, db = connection) {
  //get user with ID
  //use userId to join to fav bridge

  return db('bridges')
    .select(
      'bridges.id as id',
      ' name',
      ' location',
      ' type',
      '  year_built as yearBuilt',
      ' length_meters as lengthMeters',
      ' lanes',
      ' added_by_user as addByUser',
      ' toll_charge as tollCharge',
      'image_url as imageUrl'
    )
    .join('users', 'users.active_bridge_id', 'bridges.id')
    .where('users.id', userId)
    .first()
}

 //get user ID with Auth0_id
export async function getUserId(auth: string, db = connection): Promise<User> {
  const user = await db('users')
    .select('id')
    .where('auth0_id', auth )
    .first()
    return user
}