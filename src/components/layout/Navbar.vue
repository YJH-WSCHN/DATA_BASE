<template>
  <div class="navbar">
    <div class="hamburger-container" @click="$emit('toggle-sidebar')">
      <el-icon><Expand v-if="sidebarCollapsed" /><Fold v-else /></el-icon>
    </div>
    
    <div class="right-menu">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="32" :src="avatar" />
          <span style="margin-left: 8px;">管理员</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

defineEmits(['toggle-sidebar'])

const router = useRouter()
const avatar = ref('')
const sidebarCollapsed = ref(false)

const handleCommand = async (command) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      ElMessage.success('已退出登录')
      router.push('/login')
    } catch {
      // 用户取消操作
    }
  } else if (command === 'profile') {
    ElMessage.info('个人信息功能开发中')
  }
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.hamburger-container {
  cursor: pointer;
  font-size: 20px;
}

.right-menu {
  display: flex;
  align-items: center;
}
</style>