import connection from './connection'
import { FavouriteBridge } from '../../models/favourite-bridges'

export async function getFavBridgesDb(
  db = connection
): Promise<FavouriteBridge[]> {
  try {
    console.log("Getting Favourite bridges- getFavBridgesDb")
    return db('favourite-bridges').select(
      'id',
      'user_id as userId',
      'bridge_id as bridgeId'
    )
  } catch (error: unknown) {
    if (error instanceof Error)  {
      throw new Error(error.message)
    }
    throw error
  }
}

export async function addFavBridgeDb(
  favBridge: number,
  db = connection
): Promise<FavouriteBridge[]> {
  try {
    console.log('addFavBridgeDb Working!')
    return db('favourite-bridges').insert(favBridge)
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.log(error.message)
      throw new Error( error.message )
    }
    throw error
  }
}
