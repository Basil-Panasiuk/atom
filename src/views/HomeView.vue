<template>
  <div>
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
      v-if="mediaStore.isLoading"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
    <div v-else-if="mediaStore.videos.length" class="flex flex-row py-10">
      <MediaPlayer class="mr-6" />

      <div class="">
        <MediaCard v-for="video in mediaStore.videos" :key="video.id" :video="video"> </MediaCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { onMounted } from 'vue'
import MediaPlayer from '@/components/MediaPlayer.vue'
import MediaCard from '@/components/MediaCard.vue'

const mediaStore = useMediaStore()

onMounted(() => {
  mediaStore.getVideos()
})
</script>
