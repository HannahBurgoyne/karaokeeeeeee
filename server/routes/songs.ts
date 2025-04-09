import { Router } from 'express'

import * as db from '../db/fruits.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const songs = await db.getAllSongs()

    res.json(songs)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newSong = req.body
    await addSong(newSong)
    res.sendStatus(201)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

export default router
