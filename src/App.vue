<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <section class="main">
    <RouterView />
  </section>
</template>

<style scoped>
  section.main{
    background-color: #e8e8e8;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
