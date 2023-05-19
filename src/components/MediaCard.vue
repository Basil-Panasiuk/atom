<template>
  <div
    class="rounded-lg p-2 w-96"
    :class="{
      'bg-amber-600 cursor-pointer': isAvailable,
      'bg-zinc-600 cursor-default': !isAvailable,
      'border-black border-2': isSelected
    }"
    @click="onMediaClick"
  >
    <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
      {{ props.video.title }}
    </h5>
  </div>
</template>
<script setup lang="ts">
import type { Video } from '@/models/video.model'
import { computed } from 'vue'
import { useMediaStore } from '@/stores/media'

const props = defineProps<{
  video: Video
}>()

const mediaStore = useMediaStore()

const onMediaClick = () => {
  if (props.video.available) {
    mediaStore.selectVideo(props.video)
  }
}
const isAvailable = computed(() => {
  return props.video.available
})

const isSelected = computed(() => {
  return props.video.id === mediaStore.selectedVideo.id
})
</script>
<style lang="scss"></style>
