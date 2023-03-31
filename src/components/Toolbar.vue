<script>
export default {
    inject: ["primary_color"],
    props: ["title"],
    computed: {
        display_title () {
            if (this.title === undefined) return "MemIMTo"
            else return this.title
        }
    }
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
    </w-toolbar>
</template>