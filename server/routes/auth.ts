import express from 'express'

import * as db from '../db/users.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { AuthUser } from '../../models/users.ts'

const router = express.Router()

// Get active bridge route
router.get('/:id/active', async (req, res) => {
  const userId = Number(req.params.id)
  try {
    const activeBridge = await db.getActiveBridge(userId)
    res.json(activeBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// check active bridge route

router.get('/active/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId)
    //console.log('bridge item recieved', bridge)
    const getActiveBridge = await db.getActiveBridge(userId)
    res.json(getActiveBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong - getActiveBridge')
  }
})


// Update active bridge route
router.put('/active/:userId/:bridgeId', async (req, res) => {
  try {
    const userId = Number(req.params.userId)
    const bridgeId = Number(req.params.bridgeId)
    const updateActiveBridge = await db.updateActiveBridge(userId, bridgeId)
    res.json(updateActiveBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong - updateActiveBridge')
  }
})

// POST /api/v1/auth
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const body = Object.keys(req.body)[0]
  const authUser: AuthUser = JSON.parse(body)

  const auth0Id = req.auth?.sub
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const user = await db.getUser(authUser)
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})



//Get User ID via Auth0_id
router.get('/:auth', async (req, res) => {
  const auth = req.params.auth
  try {
    const userId = await db.getUserId(auth)
    res.json(userId)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
