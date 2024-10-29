import request from 'superagent'
import { User } from '../../models/users'
import { NewFavouriteBridge } from '../../models/favourite-bridges'

const userURL = '/api/v1/auth'

export async function UserApi(request: any): Promise<User> {
  try {
    return (await (await request)()).body
  } catch (error) {
    throw console.error('Error fetching user data.', error)
  }
}

export async function getUserIdApi(auth: string): Promise<User> {
  try {
    const res = await request.get(`${userURL}/${auth}`)
    return res.body
  } catch (error) {
    throw console.error('Error fetching user data.', error)
  }
}

export async function checkActiveBridgeApi(userId: number): Promise<User> {
  try {
    const res = await request.get(`${userURL}/active/${userId}`)
    return res.body
  } catch (error) {
    throw console.error('Error fetching active bridge data.', error)
  }
}

export async function putActiveBridgeApi(userId: number, bridgeId: number): Promise<NewFavouriteBridge> {
  try {
    const res = await request.put(`${userURL}/active/${userId}/${bridgeId}`)
    return res.body
  } catch (error) {
    throw console.error('Error updating active bridge.', error)
  }
}
