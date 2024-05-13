<template>
  <div class="game">
    <button @click="onTimeConsumingCalc">耗时计算</button>
    <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
  </div>
</template>

<script setup lang="ts">
const onTimeConsumingCalc = () => {
  let count = 0
  for (let i = 0; i < 1e8; i++) {
    count += i
  }
  console.log(count)
}
</script>

<style scoped lang="scss">
</style>
