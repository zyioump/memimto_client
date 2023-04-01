<script>
import { RouterLink } from 'vue-router'
import Toolbar from '../components/Toolbar.vue'

export default{
  inject: ["api", "primary_color"],
  props: {
    album_id: {
      required: true
    },
    cluster: {
      required: false
    }
  },
  components: {Toolbar},
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
  <Toolbar :title="album.name">
    <RouterLink class="ma1" :to="'/webcam/' + album_id">
      <w-icon v-if="album.classifier" :color="primary_color" size="2.5em">mdi mdi-camera</w-icon>
    </RouterLink>
    <RouterLink class="ma1" v-if="cluster !== undefined" :to="'/album/' + album.id">
      <w-icon :color="primary_color" size="2.5em">mdi mdi-all-inclusive-box</w-icon>
    </RouterLink>
  </Toolbar>
  <div class="pa3">
    <w-grid style="padding-top: 4em;" :columns="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }" gap="3">
      <w-image lazy @click="fullScreenImage(index)" v-for="(image, index) in album.images" style="cursor: zoom-in;" :key="image.name" :src="this.api + 'image/' + image.name" ratio="1"></w-image>
    </w-grid>
  </div>
  <w-overlay v-model="imageFullscreen" @keyup.left="keyLeft" @keyup.right="keyRight">
    <w-flex column align-center justify-center @click="imageFullscreen = false">
      <img style="max-height: 80vh; max-width: 80vw; width: auto; height: auto; cursor: zoom-out;" height="80vh" tag="img" :src="this.api + 'image/' + album.images[imageFullscreenIndex].name">
      <div>
        <w-icon :color="primary_color" @click.stop="imageFullscreenIndex--" v-if="imageFullscreenIndex > 0" class="arrow" size="5em" style="cursor: pointer;">mdi mdi-arrow-left-circle</w-icon>
        <w-icon :color="primary_color" @click.stop="imageFullscreenIndex++" v-if="imageFullscreenIndex < album.images.length - 1" size="5em" style="cursor: pointer;">mdi mdi-arrow-right-circle</w-icon>
      </div>
    </w-flex>
  </w-overlay>
</template>
<style scoped>
.w-overlay {
  backdrop-filter: blur(10px);
}
</style>