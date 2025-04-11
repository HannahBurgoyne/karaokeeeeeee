import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import MediaPlayer from './MediaPlayer'
import App from './App'
import SongsPage from './SongsPage'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<MediaPlayer />} />
      <Route path="songs" element={<SongsPage />} />
    </Route>,
  ),
)

export default routes
