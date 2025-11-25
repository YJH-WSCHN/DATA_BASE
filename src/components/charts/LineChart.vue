<template>
  <div ref="chartRef" :style="{ height: height, width: width }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  height: {
    type: String,
    default: '300px'
  },
  width: {
    type: String,
    default: '100%'
  }
})

const chartRef = ref()
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chart) return
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: props.data.series.map(item => item.name)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: props.data.series.map(item => ({
      name: item.name,
      type: 'line',
      data: item.data,
      smooth: true
    }))
  }
  
  chart.setOption(option)
}

const resizeChart = () => {
  if (chart) {
    chart.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
    chart = null
  }
  window.removeEventListener('resize', resizeChart)
})

watch(() => props.data, () => {
  updateChart()
}, { deep: true })
</script>