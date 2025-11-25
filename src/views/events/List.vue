<template>
  <div class="event-list">
    <h2 class="page-title">活动列表</h2>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>活动管理</span>
          <el-button type="primary" @click="$router.push('/events/create')">
            <el-icon><Plus /></el-icon>创建活动
          </el-button>
        </div>
      </template>
      
      <div class="filter-container">
        <el-form :inline="true" :model="queryParams">
          <el-form-item label="活动名称">
            <el-input v-model="queryParams.keyword" placeholder="请输入活动名称" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
              <el-option label="上架" value="1" />
              <el-option label="下架" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="title" label="活动名称" min-width="200" />
        <el-table-column prop="startTime" label="开始时间" width="180" />
        <el-table-column prop="endTime" label="结束时间" width="180" />
        <el-table-column prop="venue" label="地点" width="150" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="getList"
          @current-change="getList"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

const loading = ref(false)
const tableData = ref([])
const total = ref(0)

const queryParams = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  status: ''
})

const getList = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    tableData.value = [
      {
        id: 1,
        title: '周杰伦2025巡回演唱会',
        startTime: '2025-12-25 19:00:00',
        endTime: '2025-12-25 22:00:00',
        venue: '北京国家体育场',
        status: 1,
        createTime: '2025-11-01 10:00:00'
      },
      {
        id: 2,
        title: '国际动漫展',
        startTime: '2025-11-15 09:00:00',
        endTime: '2025-11-17 18:00:00',
        venue: '上海国际会展中心',
        status: 1,
        createTime: '2025-10-20 14:30:00'
      },
      {
        id: 3,
        title: '科技峰会2025',
        startTime: '2025-10-20 08:30:00',
        endTime: '2025-10-22 17:00:00',
        venue: '深圳会展中心',
        status: 0,
        createTime: '2025-09-15 09:15:00'
      }
    ]
    total.value = 156
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const resetQuery = () => {
  queryParams.page = 1
  queryParams.pageSize = 10
  queryParams.keyword = ''
  queryParams.status = ''
  getList()
}

const handleView = (row) => {
  ElMessage.info(`查看活动: ${row.title}`)
}

const handleEdit = (row) => {
  router.push(`/events/edit/${row.id}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除活动"${row.title}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    ElMessage.success('删除成功')
    getList()
  } catch {
    // 用户取消操作
  }
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-container {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>