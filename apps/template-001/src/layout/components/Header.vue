<template>
  <div class="header">
    <div class="logo">
      <img
        class="logo__img"
        src="https://v3.traincdn.com/genfiles/cms/1-285/desktop/media_asset/7c43e6fa10d0665cf556d13ff2a1906d.svg"
        alt="x-bet"
      />
    </div>
    <nav class="header-nav">
      <ul class="navbar__list">
        <li
          v-for="(nav, index) in navList"
          :key="nav.id"
          class="navbar__item"
          :class="{ 'navbar__item--active': navIndex === index }"
          @click="onChangeNavItem(index)"
          @mouseenter="onMouseEnterNav(nav)"
          @mouseleave="onMouseLeaveNav"
        >
          <span>{{ nav.name }}</span>
          <span class="icon-arrow"></span>
        </li>
        <li class="navbar__item">
          <span>更多</span>
          <span class="icon-arrow"></span>
        </li>
      </ul>
    </nav>
    <div class="header-tools">
      <div class="user-center"></div>
      <div class="setting-site"></div>
      <div></div>
    </div>
    <transition name="dropdown">
      <div v-show="isShowDownMenus" class="nav-dropdown">
        <ul class="nav-dropdown__venues">
          <li v-for="menu in downMenus" :key="menu.id">
            {{ menu.venueName }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
interface Nav {
  id: number
  name: string
  typeCode: string
  venueList?: Venue[]
}
interface Venue{
  id: number
  venueName: string
  venueCode: string
  imageAddress: string
}

const navList = ref<Nav[]>([
  {
    id: 0,
    name: '体育',
    typeCode: 'sports',
    venueList: [
      { id: 0, venueName: 'sports_ob', venueCode: 'sports_ob', imageAddress: '' },
      { id: 0, venueName: 'sports_fb', venueCode: 'sports_fb', imageAddress: '' },
      { id: 0, venueName: 'sports_tc', venueCode: 'sports_tc', imageAddress: '' }
    ]
  },
  {
    id: 1,
    name: '滚球',
    typeCode: 'in-play'
  },
  {
    id: 2,
    name: '电子',
    typeCode: 'slots',
    venueList: [
      { id: 0, venueName: 'slots_cq9', venueCode: 'slots_cq9', imageAddress: '' },
      { id: 0, venueName: 'slots_jdb', venueCode: 'slots_jdb', imageAddress: '' },
      { id: 0, venueName: 'slots_ag', venueCode: 'slots_ag', imageAddress: '' },
      { id: 0, venueName: 'slots_yb', venueCode: 'slots_yb', imageAddress: '' },
      { id: 0, venueName: 'slots_qd', venueCode: 'slots_qd', imageAddress: '' },
    ]
  },
  {
    id: 3,
    name: '棋牌',
    typeCode: 'poker',
    venueList: [
      { id: 0, venueName: 'poker_cq9', venueCode: 'poker_cq9', imageAddress: '' },
      { id: 0, venueName: 'poker_jdb', venueCode: 'poker_jdb', imageAddress: '' },
      { id: 0, venueName: 'poker_ag', venueCode: 'poker_ag', imageAddress: '' }
    ]
  },
  {
    id: 4,
    name: '真人',
    typeCode: 'live-casino',
    venueList: [
      { id: 0, venueName: 'poker_cq9', venueCode: 'poker_cq9', imageAddress: '' },
      { id: 0, venueName: 'poker_jdb', venueCode: 'poker_jdb', imageAddress: '' },
      { id: 0, venueName: 'poker_ag', venueCode: 'poker_ag', imageAddress: '' }
    ]
  },
  {
    id: 5,
    name: '彩票',
    typeCode: 'lottery',
    venueList: [
      { id: 0, venueName: 'lottery_cq9', venueCode: 'lottery_cq9', imageAddress: '' },
      { id: 0, venueName: 'lottery_jdb', venueCode: 'lottery_jdb', imageAddress: '' }
    ]
  },
  {
    id: 6,
    name: '电游',
    typeCode: 'esports',
    venueList: [{ id: 0, venueName: 'esports_cq9', venueCode: 'esports_cq9', imageAddress: '' }]
  },
  {
    id: 7,
    name: '宾果',
    typeCode: 'bingo'
  },
  {
    id: 8,
    name: '捕鱼',
    typeCode: 'fishing',
    venueList: [
      { id: 0, venueName: 'fishing_cq9', venueCode: 'fishing_cq9', imageAddress: '' },
      { id: 0, venueName: 'fishing_jdb', venueCode: 'fishing_jdb', imageAddress: '' }
    ]
  },
  {
    id: 9,
    name: '赛马',
    typeCode: 'race'
  }
])
const navIndex = ref<number>(0)
const downMenus = ref<Venue[]>([])
let isShowDownMenus = ref<boolean>(false)

const onChangeNavItem = (index: number): void => {
  navIndex.value = index
}
const onMouseEnterNav = (nav: Nav): void => {
  const { venueList } = nav
  if (!venueList) return
  downMenus.value = venueList
  isShowDownMenus.value = true
}
const onMouseLeaveNav = (): void => {
  if (!isShowDownMenus.value) return
  isShowDownMenus.value = false
}
</script>

<style lang="scss">
/**Vue transition组件 配合 CSS transition动画 使用（以下示例为完整写法，可合并简写） */
// dropdown-enter-from、dropdown-enter-active、dropdown-enter-to这三个在 transition组件中 的 元素/组件 进入时生效
// dropdown-leave-from、dropdown-leave-active、dropdown-leave-to这三个在 transition组件中 的 元素/组件 移出时生效
// 具体每个class生效时期参考Vue官方文档 https://cn.vuejs.org/guide/built-ins/transition.html
.dropdown-enter-from {
  max-height: 0;
  opacity: 0;
}
.dropdown-enter-active {
  transition: all 1s ease;
}
.dropdown-enter-to {
  max-height: 220px;
  opacity: 1;
}
// -------
.dropdown-leave-from {
  max-height: 220px;
  opacity: 1;
}
.dropdown-leave-active {
  transition: all 1s ease;
}
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

// @keyframes expand {
//   0% {
//     max-height: 0;
//     opacity: 0;
//   }
//   100% {
//     max-height: 220px;
//     opacity: 1;
//   }
// }
// .dropdown-enter-active {
//   animation: expand 1s ease;
// }
// .dropdown-leave-active {
//   animation: expand 1s ease reverse;
// }

.header {
  position: relative;
  width: 100%;
  height: 52px;
  font-size: 15px;
  padding: 0 10px;
  background-color: #1a5684;
  display: flex;
  align-items: center;
  .logo {
    width: 102px;
    height: 32px;
  }
  .logo__img {
    width: 100%;
    height: 100%;
  }
  .header-nav {
    height: 100%;
    margin-left: 30px;
  }
  .navbar__list {
    height: 100%;
    display: flex;
  }
  .navbar__item {
    height: 100%;
    padding: 0 10px;
    opacity: 0.5;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:not(:first-child) {
      margin-left: 10px;
    }
    &--active {
      opacity: 1;
    }
  }
}
.nav-dropdown {
  position: absolute;
  left: 0;
  top: 52px;
  width: 100%;
  background-color: chocolate;
}
.nav-dropdown__venues {
  height: 220px;
}
</style>
