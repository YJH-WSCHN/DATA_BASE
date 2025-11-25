<template>
  <div class="dashboard">
    <h2 class="page-title">系统概览</h2>
    
    <!-- 统计卡片 -->
    <div class="statistics-container">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6" v-for="stat in statistics" :key="stat.title">
          <div class="stat-card">
            <div class="stat-icon" :style="{ backgroundColor: stat.bgColor }">
              <el-icon size="24" :color="stat.color"><component :is="stat.icon" /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-title">{{ stat.title }}</div>
              <div class="stat-value">{{ stat.value }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <!-- 图表区域 -->
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>订单趋势</span>
          </template>
          <LineChart :data="orderChartData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>收入统计</span>
          </template>
          <LineChart :data="revenueChartData" />
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 最近活动 -->
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>最近活动</span>
      </template>
      <el-table :data="recentEvents" style="width: 100%">
        <el-table-column prop="title" label="活动名称" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="venue" label="地点" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="viewEvent(scope.row)">查看</el-button>
            <el-button size="small" type="primary" @click="editEvent(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import LineChart from '@/components/charts/LineChart.vue'

const router = useRouter()

const statistics = ref([
  {
    title: '总活动数',
    value: 156,
    icon: 'Calendar',
    color: '#1890ff',
    bgColor: '#e6f7ff'
  },
  {
    title: '总订单数',
    value: 3824,
    icon: 'Document',
    color: '#52c41a',
    bgColor: '#f6ffed'
  },
  {
    title: '总用户数',
    value: 12567,
    icon: 'User',
    color: '#fa8c16',
    bgColor: '#fff7e6'
  },
  {
    title: '总收入',
    value: '¥1,256,800',
    icon: 'Money',
    color: '#722ed1',
    bgColor: '#f9f0ff'
  }
])

const orderChartData = ref({
  xAxis: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
  series: [
    { name: '订单数', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: '收入', data: [220, 182, 191, 234, 290, 330, 310] }
  ]
})

const revenueChartData = ref({
  xAxis: ['10月', '11月', '12月', '1月', '2月', '3月'],
  series: [
    { name: '收入', data: [320, 332, 301, 334, 390, 330] }
  ]
})

const recentEvents = ref([
  {
    id: 1,
    title: '周杰伦2025巡回演唱会',
    startTime: '2025-12-25 19:00:00',
    venue: '北京国家体育场',
    status: 1
  },
  {
    id: 2,
    title: '国际动漫展',
    startTime: '2025-11-15 09:00:00',
    venue: '上海国际会展中心',
    status: 1
  },
  {
    id: 3,
    title: '科技峰会2025',
    startTime: '2025-10-20 08:30:00',
    venue: '深圳会展中心',
    status: 0
  }
])

const viewEvent = (row) => {
  ElMessage.info(`查看活动: ${row.title}`)
}

const editEvent = (row) => {
  router.push(`/events/edit/${row.id}`)
}

onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #303133;
}

.statistics-container {
  margin-bottom: 20px;
}

.stat-card {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}
</style>