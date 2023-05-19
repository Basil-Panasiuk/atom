import _videos from '@/videos.json'
import type { Video } from '@/models/video.model'
const getVideos = (): Promise<Video[]> => {
  return Promise.resolve(_videos as Video[])
}

export default {
  getVideos
}
