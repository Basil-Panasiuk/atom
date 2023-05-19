<template>
  <div>
    <YouTube :src="mediaStore.selectedVideo.video_url" @state-change="handleVideoState" />
    <h1>{{ time }} - seconds</h1>
  </div>
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'
import { useMediaStore } from '@/stores/media'
import { watch } from 'vue'
import { useStopWatch } from '@/composables/stopWatch'
import { useNotification } from '@kyvg/vue3-notification'

const mediaStore = useMediaStore()
const { notify } = useNotification()
const { time, start, stop, reset } = useStopWatch()

const handleVideoState = (e) => {
  if (mediaStore.videos[mediaStore.lastAvailable].id !== mediaStore.selectedVideo.id) {
    return
  }
  const playerState = e.data
  if (playerState === 1) {
    start()
  } else if (playerState === 2 || playerState === 3) {
    stop()
  }
}

watch(time, (value) => {
  if (value >= mediaStore.selectedVideo.video_time) {
    notify({
      title: 'Nex video is available',
      type: 'warn'
    })
    mediaStore.setNextMediaAvailable()
    reset()
  }
})

watch(
  () => mediaStore.selectedVideo,
  () => {
    reset()
  }
)
</script>
<style lang="scss"></style>
