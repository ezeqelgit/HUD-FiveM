<template>
  <div id="app" class="main" v-show="isVisibleHud">
    <LeftComp></LeftComp>
    <MiddleComp></MiddleComp>
    <RightComp></RightComp>
  </div>
</template>

<script>

import LeftComp from './components/LeftComp.vue';
import MiddleComp from './components/MiddleComp.vue';
import RightComp from './components/RightComp.vue'

import { Hud } from '/componentsScript.js';

export default {

  ...Hud,

  name: 'App',
  components: {
    LeftComp,
    MiddleComp,
    RightComp
}, 
}

</script>

<style>

@font-face {
  font-family: "bebasneue";
  src:
    url("/fonts/bebasneue_regular-webfont.woff2") format("woff2"),
    url("/fonts/bebasneue_regular-webfont.woff") format("woff");
}

@font-face {
  font-family: "gilory";
  src: 
    url("/fonts/gilroy-light-webfont.woff2") format("woff2"),
    url("/fonts/gilroy-light-webfont.woff") format("woff");
}

@font-face {
  font-family: "DrukCyr";
  src: 
    url("/fonts/drukcyr-mediumitalic-webfont.woff2") format("woff2"),
    url("/fonts/drukcyr-mediumitalic-webfont.woff") format("woff");
}

body{
  background-image: url('../image/img/backgr.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
  margin: 0;
}

.main{
  display: flex;
  justify-content: space-between;
}
</style>
