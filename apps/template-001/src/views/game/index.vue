<template>
  <div class="game">
    <section>
      <div id="ChartOne" class="chart2" style="height: 160px"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import RenderNode from '@/utils/yXroad/devChart'
import RoadUtils from '@/utils/yXroad/roadUtils'
import { handlerBigRoad } from '@/utils/yXroad/bigRoad'
// import { beadPlateRoad } from '@/utils/yXroad/beadPlateRoad'
// import { handlerSmallRoad } from '@/utils/yXroad/smallRoad'
import { roadPaper } from '../../../api-data/big-road.js'

const isLighting = ref(false) // 是否是闪电百家乐
const roadPaperObj = ref({})

const addChartTwo = () => {
  const renderNode = new RenderNode()
  renderNode.initArea({
    dom: 'ChartTwo',
    baseWidth: 24,
    totalCol: 30,
    totalRow: 6
  })
  // 大路 bigRoad
  const isLighting =
    roadPaperObj.value && roadPaperObj.value.lightningBigPairRoad && !roadPaperObj.value.bigPairRoad
  if (isLighting) {
    this.roadPaperObj.bigPairRoad = this.roadPaperObj.lightningBigPairRoad
  }
  const roadUtils = new RoadUtils(this.roadPaperObj.bigPairRoad)
  const winLossRoad = handlerBigRoad(roadUtils, {
    range: 6,
    maxColumn: 30,
    isLighting
  })
  console.log('roadUtils--', roadUtils)
  console.log('winLossRoad--', winLossRoad)

  renderNode.drawBigRoad(winLossRoad, {
    width: 24,
    radius: 6
  })
}

const initChart = (data) => {
  // this.addChartOne() // 珠盘路
  this.addChartTwo() // 大路
  // this.addChartThree() // 大眼路
  // this.addChartFour() // 小路
  // this.addChartFive() // 曱甴路
}

onMounted(() => {
  roadPaperObj.value = JSON.parse(roadPaper)
  console.log('roadPaperObj--', roadPaperObj)
  initChart()
})
</script>

<style scoped lang="scss"></style>
