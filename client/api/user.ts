import request from 'superagent'
import { User } from '../../models/users'

const userURL = '/api/v1/auth'

export async function UserApi(request: any): Promise<User> {
  try {
    return (await (await request)()).body
  } catch (error) {
    throw console.error('Error fetching user data.', error)
  }
}

export async function getuserIdApi(auth: string): Promise<User> {
  try {
    const res = await request.get(`${userURL}/${auth}`)
    return res.body
  } catch (error) {
    throw console.error('Error fetching user data.', error)
  }
}
