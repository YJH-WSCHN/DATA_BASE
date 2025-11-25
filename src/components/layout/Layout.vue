<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <Sidebar :collapse="sidebarCollapsed" />
    
    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <Navbar @toggle-sidebar="toggleSidebar" />
      
      <!-- 主内容 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import AppMain from './AppMain.vue'

const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>