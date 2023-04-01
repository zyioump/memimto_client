<script>
import { RouterView } from 'vue-router'

export default {
  methods: {
      getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
    }
}
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