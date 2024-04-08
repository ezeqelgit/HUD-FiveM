<template>
  <div class="middleComp">
    <div class="infoMiddleComp">
      <transition name="fade-move-up" class="intoMiddle">
        <div class="announce" v-if="isAnnounceText">
          <div class="titleAnnounce">
            <div class="rombAnnounce"></div>
            <span>ANNOUNCE</span>
            <div class="rombAnnounce"></div>
          </div>
          <div class="textAnnounce">
            <span class="text">{{ announceText }}</span>
          </div>
        </div>
      </transition>
      <div class="intoMiddleSecond">
        <div class="load" v-if="isLoad">
          <div class="titleAnnounce">
            <div class="rombAnnounce"></div>
            <span>{{loadingTitle}}</span>
            <div class="rombAnnounce"></div>
          </div>
          <div class="loading">
            <div class="scale">
              <div v-for="n in totalBlocks" :key="n" class="loadBlocks" :class="{ active: n <= activeBlocksCount }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { middleCompScript } from '/componentsScript.js';

  export default {
    ...middleCompScript,
};
</script>

<style>
  @import './style/middleComp.css';
</style>


