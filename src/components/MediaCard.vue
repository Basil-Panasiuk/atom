<template>
  <div
    class="rounded-lg p-2 w-96 flex items-center"
    :class="{
      'bg-orange-500 cursor-pointer': isAvailable,
      'bg-zinc-400 cursor-default': !isAvailable,
      'border-black border-2': isSelected
    }"
    @click="onMediaClick"
  >
    <div class="flex items-center mr-4">
      <span class="mr-1">{{ index + 1 }}</span>
      <el-icon v-if="isSelected"><VideoPause /></el-icon>
      <el-icon v-else-if="isAvailable"><VideoPlay /></el-icon>
      <el-icon v-else><Lock /></el-icon>
    </div>
    <h5
      class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50 whitespace-nowrap text-ellipsis overflow-hidden"
    >
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
  index: number
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
