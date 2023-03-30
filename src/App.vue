<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <head>
    <title>MemIMTo</title>
  </head>
  <RouterView />
</template>

<style>
@font-face {
  font-family: "Roboto";
  src: url("@/fonts/Roboto-Light.ttf");
}

html {
  font-family: "Roboto";
}

.w-image{
  background-position: center;
}
</style>