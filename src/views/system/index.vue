<template>
  <div class="system">
    <h2 class="page-title">系统设置</h2>
    
    <el-card>
      <template #header>
        <span>系统问题解决方案</span>
      </template>
      <el-table :data="systemIssues" style="width: 100%">
        <el-table-column prop="issue" label="问题现象" min-width="300" />
        <el-table-column prop="solution" label="解决方案" min-width="500" />
        <el-table-column label="状态" width="100">
          <template #default>
            <el-tag type="success">已解决</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <el-card style="margin-top: 20px;">
      <template #header>
        <span>技术栈信息</span>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="前端框架">Vue 3 + TypeScript + Element Plus</el-descriptions-item>
        <el-descriptions-item label="后端框架">Spring Boot 2.7 + MyBatis Plus</el-descriptions-item>
        <el-descriptions-item label="数据库">MySQL 8.0 + Redis</el-descriptions-item>
        <el-descriptions-item label="消息队列">RabbitMQ</el-descriptions-item>
        <el-descriptions-item label="部署方式">Docker + Nginx</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const systemIssues = ref([
  {
    issue: '实际售出票数超过库存数量',
    solution: '数据库锁机制锁定要更新的记录，使用SELECT ... FOR UPDATE语句锁定库存记录'
  },
  {
    issue: '用户支付状态与订单状态不同步，如已支付但订单未确认',
    solution: '定时任务定期扫描超时未支付订单并自动取消'
  },
  {
    issue: '用户多次点击生成重复订单',
    solution: '前端防护：点击提交后禁用按钮，防止重复点击；后端接口幂等性设计'
  }
])
</script>

<style scoped>
</style>