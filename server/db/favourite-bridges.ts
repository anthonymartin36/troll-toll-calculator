import { Knex } from 'knex'
import connection from './connection'
import { NewFavouriteBridge, FavouriteBridge } from '../../models/favourite-bridges'
import { useRevalidator } from 'react-router-dom'
import { useRouteId } from 'react-router/dist/lib/hooks'

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

export async function checkFavBridgesDb(
  db: Knex = connection,
  newFav: NewFavouriteBridge
): Promise<Number[]> {
  try {
    console.log("Checking Favourite bridges - checkFavBridgesDb")
    return await db('favourite-bridges').select('*')
    .where('user_id', newFav.userId)
    .where('bridge_id', newFav.bridgeId)
    .returning('id')
  } catch (error: unknown) {
    if (error instanceof Error)  {
      throw new Error(error.message)
    }
    throw error
  }
}

export async function addFavBridgeDb(newFav: NewFavouriteBridge)//: Promise<NewFavouriteBridge[]> 
{
  //check using the checkFavBridgeDB function and passing the newFav object
  // if the bridge and user already exist return false else true,
  // if true is returned then avoid completing the function.
  // if false is returned then complete the function.
  //const x = await checkFavBridgesDb(newFav)? console.log('Bridge already in favourites') : console.log('Bridge not in favourites')
  try {
    console.log('addFavBridgeDb Working!')

    const [{id: newBridigeId}] = await connection('favourite-bridges').insert({
      bridge_id: newFav.bridgeId,
      user_id:newFav.userId,
    }).returning('id')

  } catch (error: unknown) {
    if(error instanceof Error) {
      console.log(error.message)
      throw new Error( error.message )
    }
    throw error
  }
}

export async function deleteFavBridgeDb(
  favBridge: number,
  db = connection
): Promise<FavouriteBridge[]> {
  try {
    console.log('deleteFavBridgeDb Working!')
    return db('favourite-bridges').where('bridge_id as bridgeId', favBridge).del()
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.log(error.message)
      throw new Error( error.message )
    }
    throw error
  }
}
