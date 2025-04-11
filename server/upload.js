import multer from 'multer'
import path from 'path'
import slugifyFilename from '../utils/slugify'

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destination = path.resolve('./public/videos')
    callback(null, destination) // Destination folder for uploaded files
  },
  filename: function (req, file, callback) {
    // Generate a unique filename for the uploaded file
    const originalName = path.parse(file.originalname).name
    const extension = path.extname(file.originalname)
    const safeName = slugifyFilename(originalName)
    callback(null, `${safeName}${extension}`)
  },
})

// Initialize multer with the storage configuration
const upload = multer({ storage: storage })

export default upload
