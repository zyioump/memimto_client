<script>
import { RouterLink } from 'vue-router'

export default{
  inject: ["api"],
  props: {
    album_id: {
      required: true
    },
    cluster: {
      required: false
    }
  },
  data: function () {
    return {
      album: {},
      imageFullscreen: false,
      imageFullscreenIndex: 0
    }
  },
  watch: {
    cluster: function() {
      this.get()
    },
    album_id: function() {
      this.get()
    }
  },
  methods: {
    get: async function() {
      if (this.cluster === undefined){
        this.album = await (await fetch(this.api + "album/" + this.album_id)).json()
      } else {
        this.album = await (await fetch(this.api + "album/" + this.album_id + "/cluster/" + this.cluster)).json()
      }
    },
    fullScreenImage: function(index){
      this.imageFullscreen = true
      this.imageFullscreenIndex = index
    },
    keyLeft: function() {
      if (this.imageFullscreenIndex > 0) {
        this.imageFullscreenIndex--
      }
    },
    keyRight: function() {
      if (this.imageFullscreenIndex < this.album.images.length - 1){
        this.imageFullscreenIndex++
      }
    }
  },
  mounted: function() {
    this.get()
  }
}
</script>

<template>
  <main style="padding: 12px;">
    <w-toolbar fixed shadow>
      <RouterLink to="/">
        <w-icon color="light-blue-dark3" size="2.5em">mdi mdi-image</w-icon>
      </RouterLink>
      <h1 class="title1 pa3">{{ album.name }}</h1>
      <div class="spacer"></div>
      <RouterLink :to="'/webcam/' + album_id">
        <w-icon color="light-blue-dark3" size="2.5em">mdi mdi-camera</w-icon>
      </RouterLink>
      <RouterLink v-if="cluster !== undefined" :to="'/album/' + album.id">
        <w-icon color="light-blue-dark3" size="2.5em">mdi mdi-all-inclusive-box</w-icon>
      </RouterLink>
    </w-toolbar>
    <w-grid :columns="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }" gap="3">
      <w-image lazy @click="fullScreenImage(index)" v-for="(image, index) in album.images" :key="image.name" :src="this.api + 'image/' + image.name" ratio="1"></w-image>
    </w-grid>
    <w-overlay v-model="imageFullscreen" @keyup.left="keyLeft" @keyup.right="keyRight">
      <w-flex column align-center justify-center @click="imageFullscreen = false">
        <img style="max-height: 80vh; max-width: 80vw; width: auto; height: auto;" height="80vh" tag="img" :src="this.api + 'image/' + album.images[imageFullscreenIndex].name">
        <div>
          <w-icon color="light-blue-dark3" @click.stop="imageFullscreenIndex--" v-if="imageFullscreenIndex > 0" class="arrow" size="5em">mdi mdi-arrow-left-circle</w-icon>
          <w-icon color="light-blue-dark3" @click.stop="imageFullscreenIndex++" v-if="imageFullscreenIndex < album.images.length - 1" size="5em">mdi mdi-arrow-right-circle</w-icon>
        </div>
      </w-flex>
    </w-overlay>
  </main>
</template>
<style scoped>
.arrow{
  padding: 12px;
}
.w-overlay {backdrop-filter: blur(10px);}
</style>