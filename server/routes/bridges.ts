import express from 'express'
import * as dbBridge from '../db/bridges.ts'
import * as dbFavBridge from '../db/favourite-bridges.ts'

const router = express.Router()
// -- MVP -- //
router.get('/', async (req, res) => {
  try {
    const bridges = await dbBridge.getAllBridgesDb()
    res.json(bridges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})
// GET /api/v1/bridges/fav/:userId
router.get('/fav/:userId', async (req, res) => {
  try {
     const userId = Number(req.params.userId)
     //console.log("route getUserFavBridgesDb userId : ", userId)
     const favBridges = await dbFavBridge.getUserFavBridgesDb(userId)
     res.json(favBridges)
   } catch (error) {
     console.error(error)
     res.status(500).send('Something went wrong')
   }
 })

//GET /api/v1/bridges/bridgeId/userId
router.get(`/:bridgeId/:userId`, async (req, res) => {
  const bridgeId = Number(req.params.bridgeId)
  const userId = Number(req.params.userId)
  try {
    const favBridge = await dbFavBridge.checkFavBridgesDb(bridgeId, userId)
    res.json(favBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//GET /api/v1/bridges/fav
router.get('/fav', async (req, res) => {
  try {
    const favBridges = await dbFavBridge.getFavBridgesDb()
    res.json(favBridges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/bridges/:id
router.get('/:id', async (req, res) => {
  const bridgeId = Number(req.params.id)
  try {
    const bridge = await dbBridge.getBridgeByIdDb(bridgeId)
    res.json(bridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/bridges/fav 
router.post('/fav', async (req, res) => {
  try {
    const bridge = req.body
    //console.log('bridge item recieved', bridge)
    const addedBridge = await dbFavBridge.addFavBridgeDb(bridge)
    res.json(addedBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong - addFavBridgeDb')
  }
})

router.delete('/fav', async (req, res) => {
  try {
    const bridge = req.body
    const addedBridge = await dbFavBridge.deleteFavBridgeDb(bridge)
    res.json(addedBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router

//TEST
