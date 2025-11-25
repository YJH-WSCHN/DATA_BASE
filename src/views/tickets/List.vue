<template>
  <div class="ticket-list">
    <h2 class="page-title">票种列表</h2>
    
    <el-card>
      <template #header>
        <div class="card-header">
          <span>票务管理</span>
          <el-button type="primary" @click="$router.push('/tickets/create')">
            <el-icon><Plus /></el-icon>添加票种
          </el-button>
        </div>
      </template>
      
      <div class="filter-container">
        <el-form :inline="true" :model="queryParams">
          <el-form-item label="活动名称">
            <el-input v-model="queryParams.eventTitle" placeholder="请输入活动名称" clearable />
          </el-form-item>
          <el-form-item label="票种名称">
            <el-input v-model="queryParams.ticketName" placeholder="请输入票种名称" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="eventTitle" label="活动名称" min-width="200" />
        <el-table-column prop="name" label="票种名称" width="150" />
        <el-table-column prop="price" label="价格" width="120">
          <template #default="scope">¥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column prop="sold" label="已售" width="100" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
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
  eventTitle: '',
  ticketName: ''
})

const getList = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    tableData.value = [
      {
        id: 1,
        eventTitle: '周杰伦2025巡回演唱会',
        name: 'VIP票',
        price: 1280,
        stock: 100,
        sold: 85,
        description: 'VIP专属区域，包含专属礼品'
      },
      {
        id: 2,
        eventTitle: '周杰伦2025巡回演唱会',
        name: '普通票',
        price: 680,
        stock: 500,
        sold: 420,
        description: '普通座位区域'
      },
      {
        id: 3,
        eventTitle: '国际动漫展',
        name: '单日票',
        price: 120,
        stock: 1000,
        sold: 750,
        description: '单日入场通行证'
      }
    ]
    total.value = 45
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const resetQuery = () => {
  queryParams.page = 1
  queryParams.pageSize = 10
  queryParams.eventTitle = ''
  queryParams.ticketName = ''
  getList()
}

const handleEdit = (row) => {
  ElMessage.info(`编辑票种: ${row.name}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除票种"${row.name}"吗？`, '提示', {
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