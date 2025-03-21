import connection from './connection'
import { User, AuthUser } from '../../models/users'

export async function getUser(
  authUser: AuthUser,
  db = connection
): Promise<User> {
  // Get user if existing
  //console.log("authUser : ", authUser.auth0_id)
  //sleep(10000) awaiting auth0_id to be defined
  if (!authUser.auth0_id){
    throw new Error('auth0_id is undefined')
  }
  const user = await db('troll-users')
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
  //get user with ID   //use userId to join to fav bridge
  return db('bridges')
    .select(
      'bridges.id as id',
      'name',
      'location',
      'type',
      'year_built as yearBuilt',
      'length_meters as lengthMeters',
      'lanes',
      'added_by_user as addByUser',
      'toll_charge as tollCharge',
      'image_url as imageUrl'
    )
    .join('troll-users', 'troll-users.active_bridge_id', 'bridges.id')
    .where('troll-users.id', userId)
    .first()
}

 //get user ID with Auth0_id
export async function getUserId(auth: string, db = connection): Promise<User> {
  const user = await db('troll-users')
    .select('id')
    .where('auth0_id', auth )
    .first()
    return user
}

// add active bridge from user
export async function updateActiveBridge(
  userId: number,
  bridgeId: number,
  db = connection ) {
  try {
    return db('troll-users')
    .where('id', userId)
    .update({'active_bridge_id': bridgeId})
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.log(error.message)
      throw new Error( error.message )
    }
    throw error
  }
}

// remove active bridge from user
// export async function addActiveBridge(
//   userId: number, 
//   bridgeId:number ) { // , db = connection
//   try {
//     const id = await connection('users')
//     .where('id', userId)
//     .insert({
//       'active_bridge_id': bridgeId})
//     .returning('active_bridge_id')

//   } catch (error: unknown) {
//     if(error instanceof Error) {
//       console.log(error.message)
//       throw new Error( error.message )
//     }
//     throw error
//   }
// }