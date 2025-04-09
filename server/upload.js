import multer from 'multer'
import path from 'path'

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destination = path.resolve('./public/videos')
    callback(null, destination) // Destination folder for uploaded files
  },
  filename: function (req, file, callback) {
    // Generate a unique filename for the uploaded file
    callback(null, file.originalname)
  },
})

// Initialize multer with the storage configuration
const upload = multer({ storage: storage })

export default upload
