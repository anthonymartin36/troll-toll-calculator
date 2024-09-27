import { Knex } from 'knex'
import connection from './connection'
import { NewFavouriteBridge, FavouriteBridge, UserFavouriteBridge } from '../../models/favourite-bridges'
// import { useRevalidator } from 'react-router-dom'
// import { useRouteId } from 'react-router/dist/lib/hooks'

export async function getFavBridgesDb(
  db = connection
): Promise<FavouriteBridge[]> {
  try {
    //console.log("Getting Favourite bridges- getFavBridgesDb")
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

export async function getUserFavBridgesDb(
  userId: Number,
  db = connection
): Promise<UserFavouriteBridge[]> {
  try {
    //console.log("Getting Favourite bridges- getUserFavBridgesDb")
    return db('favourite-bridges')
    .select(
      'bridge_id as bridgeId',
      'image_url as imageUrl',
      'name'
    )
    .join('bridges', 
      'bridges.id',
      'favourite-bridges.bridge_id'
    )
    .where( 'user_id', userId)
  } catch (error: unknown) {
    if (error instanceof Error)  {
      throw new Error(error.message)
    }
    throw error
  }
}

export async function checkFavBridgesDb(
  userId: Number,
  bridgeId: Number,
  db: Knex = connection
): Promise<Number[]> {
  try {
    //console.log("Checking Favourite bridges - checkFavBridgesDb")
    return await db('favourite-bridges').select('bridge_id as bridgeId')
    .where( {'bridge_id': bridgeId,
            'user_id': userId })
    .first()
    
    // select id from favourite-bridges where bridge_id = bridgeId and user_id = userId
  } catch (error: unknown) {
    if (error instanceof Error)  {
      throw new Error(error.message)
    }
    throw error
  }
}

export async function addFavBridgeDb(newFav: NewFavouriteBridge)//: Promise<NewFavouriteBridge[]> 
{
 try {
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
  favBridge: any,
  db = connection
): Promise<FavouriteBridge[]> {
  try {
    return db('favourite-bridges')
    .where('bridge_id', favBridge.bridgeId)
    .where('user_id', favBridge.userId)
    .del()
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.log(error.message)
      throw new Error( error.message )
    }
    throw error
  }
}
