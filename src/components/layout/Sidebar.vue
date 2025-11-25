<template>
  <div class="sidebar" :class="{ 'collapsed': collapse }">
    <div class="logo-container">
      <el-icon size="32" color="#1890ff"><Ticket /></el-icon>
      <span class="logo-text" v-show="!collapse">票务管理系统</span>
    </div>
    
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#1890ff"
      router
    >
      <el-menu-item index="/dashboard">
        <el-icon><House /></el-icon>
        <span>系统概览</span>
      </el-menu-item>
      
      <el-sub-menu index="/events">
        <template #title>
          <el-icon><Calendar /></el-icon>
          <span>活动管理</span>
        </template>
        <el-menu-item index="/events/list">活动列表</el-menu-item>
        <el-menu-item index="/events/create">创建活动</el-menu-item>
      </el-sub-menu>
      
      <el-sub-menu index="/tickets">
        <template #title>
          <el-icon><Ticket /></el-icon>
          <span>票务管理</span>
        </template>
        <el-menu-item index="/tickets/list">票种列表</el-menu-item>
        <el-menu-item index="/tickets/create">添加票种</el-menu-item>
      </el-sub-menu>
      
      <el-sub-menu index="/orders">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/orders">订单列表</el-menu-item>
      </el-sub-menu>
      
      <el-menu-item index="/statistics">
        <el-icon><DataAnalysis /></el-icon>
        <span>数据统计</span>
      </el-menu-item>
      
      <el-menu-item index="/system">
        <el-icon><Setting /></el-icon>
        <span>系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #304156;
  color: #bfcbd9;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 64px;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #263445;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  margin-left: 12px;
}

.sidebar.collapsed .logo-text {
  display: none;
}

.el-menu {
  border: none;
  background-color: #304156;
}
</style>