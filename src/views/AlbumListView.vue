<script>
import { RouterLink } from 'vue-router'

export default{
  inject: ["api"],
  data: function () {
    return {
      albums: []
    }
  },
  methods: {
    get: async function() {
      this.albums = await (await fetch(this.api + "albums")).json()
    }
  },
  mounted: function() {
    this.get()
  }
}
</script>

<template>
  <main>
    <h1>Albums available :</h1>
    <ul>
      <li v-for="album in albums"><RouterLink :to="'/album/' + album.id">{{ album.name }}</RouterLink> <RouterLink :to="'/webcam/' + album.id">(webcam search)</RouterLink> - {{ album.length }} images</li>
    </ul>
  </main>
</template>
