import { createRouter, createWebHistory } from 'vue-router'
import AlbumListView from '../views/AlbumListView.vue'
import AlbumView from '../views/AlbumView.vue'
import UploadView from '../views/UploadView.vue'
import WebcamView from '../views/WebcamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'albumList',
      component: AlbumListView
    },
    {
      path: '/album/:album_id',
      props: true,
      name: 'album',
      component: AlbumView
    },
    {
      path: '/album/:album_id/:cluster',
      props: true,
      name: 'albumCluster',
      component: AlbumView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/webcam/:album_id',
      props: true,
      name: 'webcam',
      component: WebcamView
    }
  ]
})

export default router
