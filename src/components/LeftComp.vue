<template>
  <div class="leftComp">
      <div class="time">
        <span class="timing">{{ currentTime }}</span>
        <span class="date">{{ currentDate }}</span>
      </div>
    <div class="wrapper">
      <div class="information">
        <transition-group name="slide-fade" tag="div" class="intoNotification">
          <div class="notification" v-for="notification in visibleNotifications" :key="notification.id">
        <div class="titlePush">
          <div class="rombPush"></div>
          <span>{{ notification.title }}</span>
        </div>
        <div class="placePush">
          <div class="rectanglePush"></div>
          <span>{{ notification.text }}</span>
        </div>
        <div class="userPush">
          <img src="./svgLeftComp/userPush.svg">
          <span>By {{ notification.userName }}</span>
        </div>
      </div>
    </transition-group>
        <div class="intoLocation"  v-if="isLocation">
          <div class="location">
        <div class="title">
          <div class="romb"></div>
          <span>Location</span>
        </div>
        <div class="place">
          <div class="rectangle"></div>
          <span>{{ MapPosition }}</span>
        </div>
      </div>
        </div>
        <div class="mapContainer">
          <div class="map"></div>
        </div>
    </div>
    <div class="job" v-if="isJob">
      <div class="titleJob">
          <div class="romb"></div>
          <span>Job</span>
      </div>
      <div class="textJob">
        <div class="rectangle"></div> 
        <span>{{ jobPosition }}</span>
      </div>
      <div class="userPost">
          <img src="./svgLeftComp/post.svg">
          <span>{{ jobSpecialist }}</span>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
  import { leftCompScript } from '/componentsScript.js';

  export default {
    ...leftCompScript,
};
</script>

<style>
  @import './style/leftComp.css';
</style>