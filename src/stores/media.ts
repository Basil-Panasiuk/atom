import { defineStore } from 'pinia'
import type { Video } from '@/models/video.model'
import mediaApi from '@/api/media'

type MediaState = {
  videos: Video[]
  isLoading: boolean
  selectedVideo: Video | null
}

export const useMediaStore = defineStore('mediaStore', {
  state: () =>
    ({
      videos: [],
      isLoading: false,
      selectedVideo: null
    } as MediaState),
  actions: {
    getVideos() {
      this.isLoading = true

      setTimeout(async () => {
        try {
          const response = await mediaApi.getVideos()
          this.videos = response
          this.selectedVideo = response[0]
        } catch (e) {
          console.log('Failed to load videos')
        } finally {
          this.isLoading = false
        }
      }, 500)
    },
    setNextMediaAvailable() {
      this.videos[this.lastAvailable + 1].available = true
    },
    selectVideo(video: Video) {
      this.selectedVideo = video
    }
  },
  getters: {
    lastAvailable(): number {
      return this.videos.findLastIndex((item) => item.available)
    }
  }
})
