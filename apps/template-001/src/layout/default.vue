<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<style>
.header {
  width: 100%;
  height: 50px;
  background: var(--header-bg-color);
}
</style>
