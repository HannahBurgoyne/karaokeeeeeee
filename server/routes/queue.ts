import { Router } from 'express'

import * as db from '../db/queue.ts'
import { Video } from '../../models/Video.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const queue = await db.getQueue()

    res.json(queue)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const song = req.body as Video
    await db.addSongToQueue(song)
    res.sendStatus(201)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

export default router
