import request from 'superagent'
import { Bridge } from '../../models/bridge.ts'
import { FavouriteBridge, UserFavouriteBridge } from '../../models/favourite-bridges.ts'

const bridgeURL = '/api/v1/bridges'

export async function getBridgesApi(): Promise<Bridge[]> {
  try {
    const res = await request.get(bridgeURL)
    return res.body
  } catch (error) {
    throw console.error('Error fetching bridges.', error)
  }
}
export async function getFavBridgesApi(): Promise<FavouriteBridge[]> {
  try {
    const res = await request.get(`${bridgeURL}/fav`)
    return res.body
  } catch (error) {
    throw console.error('Error fetching bridges.', error)
  }
}

export async function addFavBridgeApi(bridge: FavouriteBridge): Promise<FavouriteBridge> {
  try {
    const res = await request.post(`${bridgeURL}/fav`).send(bridge)
    return res.body
  } catch (error) {
    console.error('Error adding favourite bridge.', error)
    throw new Error('Failed to add favourite bridge.')
  }
}

export async function getSingleBridgeApi(id: number): Promise<Bridge> {
  try {
    const res = await request.get(`${bridgeURL}/${id}`)
    return res.body
  } catch (error) {
    console.error(`Error fetching bridge with id ${id}:`, error)
    throw new Error(`Failed to fetch bridge with id ${id}`)
  }
}

export async function getUserFavBridgeApi(userId: number): Promise<UserFavouriteBridge[]> {
  try {
    const res = await request.get(`${bridgeURL}/fav/${userId}`)
    return res.body
  } catch (error) {
    console.error(`Error fetching bridge with id ${userId}:`, error)
    throw new Error(`Failed to fetch bridge with id ${userId}`)
  }
}

export async function getUserIndFavBridgeApi(bridgeId: number, userid: number): Promise<UserFavouriteBridge> {
  try {
    const res = await request.get(`${bridgeURL}/fav/${bridgeId}/${userid}`)
    return res.body
  } catch (error) {
    console.error(`Error fetching bridge with id ${bridgeId}:`, error)
    throw new Error(`Failed to fetch bridge with id ${bridgeId}`)
  }
}