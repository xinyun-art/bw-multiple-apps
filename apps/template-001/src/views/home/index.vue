<template>
  <div class="home">
    <div class="banner text-3xl font-bold underline">
      {{ $t('这是banner') }}
    </div>
    <div class="game">
      {{ $t('这是content') }}
      <HelloWorld msg="It is message" />
      <ul>
        <li v-for="item in games" :key="item.id">
          {{ item.venueTypeName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryGameAssortList } from '@/apis/game'

const instance = getCurrentInstance()
const $t = instance?.proxy?.$t
console.log('ins--', instance)
console.log('ins--', instance?.proxy?.$t)

const router = useRouter()
const games = ref([
  {
    id: 0,
    venueTypeCode: 'cp',
    venueTypeName: $t('彩票'),
  },
  {
    id: 1,
    venueTypeCode: 'ty',
    venueTypeName: $t('体育'),
  }
])

onMounted(async () => {
  console.log('router--', router)
  
  // const data = await queryGameAssortList()
  // console.log('data--', data)
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
