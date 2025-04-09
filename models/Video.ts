export interface Video extends NewVideo {
  id: number
}

export interface NewVideo {
  name: string
  artist: string
  url: string
}
