import request from 'superagent'
import { User } from '../../models/users'
import { NewFavouriteBridge } from '../../models/favourite-bridges'

const userURL = '/api/v1/auth'

export async function UserApi(authRequest: () => Promise<any>): Promise<User> {
  try {
    const response = await authRequest()
    return response.body
  } catch (error) {
    console.error('Error fetching user data.', error)
    throw error
  }
}

export async function getUserIdApi(auth: string, token: string): Promise<User> {
  try {
    const res = await request
      .get(`${userURL}/${auth}`)      
      .set('Authorization', `Bearer ${token}`)
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
