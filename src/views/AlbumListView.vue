<script>
import { RouterLink } from 'vue-router'
import Toolbar from '../components/Toolbar.vue'

export default{
    inject: ["api", "primary_color"],
    data: function () {
        return {
            albums: []
        };
    },
    methods: {
        get: async function () {
            this.albums = await (await fetch(this.api + "albums")).json();
        }
    },
    mounted: function () {
        this.get();
    },
    components: { Toolbar }
}
</script>

<template>
  <div class="pa3">
    <w-grid style="padding-top: 4em;" :columns="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }" gap="3">
      <RouterLink style="text-decoration: none; color: inherit;" v-for="album in albums" :to="/album/ + album.id" >
        <w-card>
          <template #title>
            <w-toolbar :bg-color="primary_color">
              <h1 class="title3">{{ album.name }}</h1>
              <div class="spacer"></div>
              <RouterLink :to="'/webcam/' + album.id">
                <w-icon color="white">mdi mdi-camera</w-icon>
              </RouterLink>
            </w-toolbar>
          </template>
          <w-grid columns="2">
            <w-image lazy ratio="1" v-for="image in album.sample" :src="this.api + 'image/' + image.name"></w-image>
          </w-grid>
        </w-card>
      </RouterLink>
    </w-grid>
  </div>
  <Toolbar></Toolbar>
</template>
