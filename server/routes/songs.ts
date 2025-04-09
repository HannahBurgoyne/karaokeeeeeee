import { Router } from 'express'
import * as db from '../db/songs.ts'
import upload from '../upload.js'

// interface MulterRequest extends Request {
//   file: Express.Multer.File
// }

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

router.post('/', upload.single('video'), async (req, res) => {
  try {
    console.log('file', req.file?.filename)
    const newSong = {
      name: req.body.name,
      artist: req.body.artist,
      url: req.file?.filename as string, // Store the path to the uploaded video file in the database
    }
    console.log('server', newSong)

    await db.addSong(newSong) // Add song to the database
    res.sendStatus(201) // Send a success status
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

export default router
