<script>
import { RouterLink } from 'vue-router'

export default {
    inject: ["primary_color"],
    props: ["title"],
    computed: {
        display_title() {
            if (this.title === undefined)
                return "MemIMTo";
            else
                return this.title;
        },
        is_logged() {
            if (this.$root.getCookie("jwt") == "")
                return false;
            else
                return true;
        }
    },
    components: { RouterLink }
}
</script>
<template>
    <w-toolbar height="4em" fixed shadow>
      <RouterLink to="/">
        <w-icon :color="primary_color" size="2.5em">mdi mdi-image</w-icon>
      </RouterLink>
      <h1 class="title1 pa3">{{ display_title }}</h1>
      <div class="spacer"></div>
      <slot></slot>
      <RouterLink class="ma1" v-if="!is_logged" to="/login">
        <w-icon :color="primary_color" size="2.5em">mdi mdi-account-circle</w-icon>
      </RouterLink>
      <RouterLink class="ma1" v-else to="/upload">
        <w-icon :color="primary_color" size="2.5em">mdi mdi-cloud-upload</w-icon>
      </RouterLink>
    </w-toolbar>
</template>