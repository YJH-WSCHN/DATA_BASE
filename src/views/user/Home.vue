<template>
  <div class="home-container">
    <div class="header">
      <h1>🎫 票务活动管理系统</h1>
      <p>测试演示版本 - 已跳过登录</p>
    </div>
    
    <div class="main-content">
      <h2>系统功能导航</h2>
      <div class="nav-buttons">
        <el-button type="primary" @click="$router.push('/events')">浏览活动</el-button>
        <el-button @click="$router.push('/orders')">我的订单</el-button>
        <el-button @click="$router.push('/profile')">个人中心</el-button>
      </div>
      
      <div class="feature-cards">
        <el-card class="feature-card" shadow="hover">
          <h3>🎪 活动管理</h3>
          <p>浏览、搜索各类活动</p>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <h3>🎫 票务订购</h3>
          <p>在线购买活动门票</p>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <h3>📦 订单管理</h3>
          <p>查看和管理订单状态</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.main-content {
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 40px 20px;
  min-height: 60vh;
}

.main-content h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.nav-buttons {
  text-align: center;
  margin-bottom: 40px;
}

.nav-buttons .el-button {
  margin: 0 10px;
}

.feature-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  width: 300px;
  text-align: center;
  padding: 30px 20px;
}

.feature-card h3 {
  color: #409eff;
  margin-bottom: 15px;
  font-size: 1.3em;
}
</style>