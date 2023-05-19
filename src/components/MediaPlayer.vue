<template>
  <div>
    <YouTube :src="mediaStore.selectedVideo.video_url" @state-change="handleVideoState" />
  </div>
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'
import { useMediaStore } from '@/stores/media'
import { watch } from 'vue'
import { useStopWatch } from '@/composables/stopWatch'
import { ElNotification } from 'element-plus'
const mediaStore = useMediaStore()
const { time, start, stop, reset } = useStopWatch()

const notify = () => {
  ElNotification({
    title: 'Great!',
    message: 'Nex video is available',
    type: 'success',
    duration: 3000
  })
}

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
    notify()
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
