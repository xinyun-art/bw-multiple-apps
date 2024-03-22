<template>
  <div class="home">
    <div class="banner">
      这是banner
    </div>
    <div class="game">
      这是game
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryGameAssortList } from '@/apis/game'

const router = useRouter()

onMounted(async () => {
  console.log('router--', router)
  
  const data = await queryGameAssortList()
  console.log('data--', data)
  
})
</script>

<style scoped lang="scss">
.banner {
  height: 300px;
  padding: 10px;
  font-size: 18px;
  color: var(--title1-color);
  background-color: var(--home-banner);
}
.game {
  height: 550px;
  padding: 10px;
  font-size: 16px;
  color: var(--title2-color);
  background-color: var(--home-game);
}
</style>
