<template>
  <div class="statistics">
    <h2 class="page-title">数据统计</h2>
    
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>收入统计</span>
          </template>
          <LineChart :data="revenueChartData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>订单统计</span>
          </template>
          <LineChart :data="orderChartData" />
        </el-card>
      </el-col>
    </el-row>
    
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>活动销售排行</span>
      </template>
      <el-table :data="eventSalesRanking" style="width: 100%">
        <el-table-column type="index" label="排名" width="80" />
        <el-table-column prop="title" label="活动名称" />
        <el-table-column prop="ticketSales" label="票务销量" width="120" />
        <el-table-column prop="revenue" label="收入" width="120">
          <template #default="scope">¥{{ scope.row.revenue }}</template>
        </el-table-column>
        <el-table-column label="完成率" width="120">
          <template #default="scope">
            <el-progress :percentage="scope.row.completionRate" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LineChart from '@/components/charts/LineChart.vue'

const revenueChartData = ref({
  xAxis: ['10月', '11月', '12月', '1月', '2月', '3月'],
  series: [
    { name: '收入', data: [320, 332, 301, 334, 390, 330] }
  ]
})

const orderChartData = ref({
  xAxis: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
  series: [
    { name: '订单数', data: [120, 132, 101, 134, 90, 230, 210] }
  ]
})

const eventSalesRanking = ref([
  { title: '周杰伦2025巡回演唱会', ticketSales: 505, revenue: 425600, completionRate: 85 },
  { title: '国际动漫展', ticketSales: 750, revenue: 90000, completionRate: 75 },
  { title: '科技峰会2025', ticketSales: 320, revenue: 95680, completionRate: 64 },
  { title: '话剧《雷雨》', ticketSales: 180, revenue: 54000, completionRate: 90 },
  { title: '国际车展', ticketSales: 420, revenue: 126000, completionRate: 70 }
])

onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
</style>