<template>
  <div class="order-list">
    <h2 class="page-title">订单列表</h2>
    
    <el-card>
      <div class="filter-container">
        <el-form :inline="true" :model="queryParams">
          <el-form-item label="订单号">
            <el-input v-model="queryParams.orderNumber" placeholder="请输入订单号" clearable />
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="queryParams.eventTitle" placeholder="请输入活动名称" clearable />
          </el-form-item>
          <el-form-item label="联系人手机">
            <el-input v-model="queryParams.contactPhone" placeholder="请输入联系人手机" clearable />
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
              <el-option label="待支付" value="0" />
              <el-option label="已支付" value="1" />
              <el-option label="已完成" value="2" />
              <el-option label="已取消" value="3" />
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
        <el-table-column prop="orderNumber" label="订单号" width="180" />
        <el-table-column prop="eventTitle" label="活动名称" min-width="200" />
        <el-table-column prop="ticketTypeName" label="票种名称" width="120" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="totalAmount" label="总金额" width="120">
          <template #default="scope">¥{{ scope.row.totalAmount }}</template>
        </el-table-column>
        <el-table-column prop="contactName" label="联系人" width="100" />
        <el-table-column prop="contactPhone" label="联系人手机" width="140" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag 
              :type="scope.row.status === 1 ? 'success' : 
                      scope.row.status === 0 ? 'warning' : 
                      scope.row.status === 2 ? 'info' : 'danger'"
            >
              {{ 
                scope.row.status === 0 ? '待支付' : 
                scope.row.status === 1 ? '已支付' : 
                scope.row.status === 2 ? '已完成' : '已取消' 
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button 
              size="small" 
              type="danger" 
              v-if="scope.row.status === 1" 
              @click="handleRefund(scope.row)"
            >
              退款
            </el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)

const queryParams = reactive({
  page: 1,
  pageSize: 10,
  orderNumber: '',
  eventTitle: '',
  contactPhone: '',
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
        orderNumber: '202511050001',
        eventTitle: '周杰伦2025巡回演唱会',
        ticketTypeName: 'VIP票',
        quantity: 2,
        totalAmount: 2560,
        contactName: '张三',
        contactPhone: '13800138000',
        status: 1,
        createTime: '2025-11-05 10:30:25'
      },
      {
        id: 2,
        orderNumber: '202511040015',
        eventTitle: '国际动漫展',
        ticketTypeName: '单日票',
        quantity: 4,
        totalAmount: 480,
        contactName: '李四',
        contactPhone: '13900139000',
        status: 0,
        createTime: '2025-11-04 15:42:10'
      },
      {
        id: 3,
        orderNumber: '202511030078',
        eventTitle: '科技峰会2025',
        ticketTypeName: '普通票',
        quantity: 1,
        totalAmount: 299,
        contactName: '王五',
        contactPhone: '13700137000',
        status: 2,
        createTime: '2025-11-03 09:15:33'
      }
    ]
    total.value = 3824
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const resetQuery = () => {
  queryParams.page = 1
  queryParams.pageSize = 10
  queryParams.orderNumber = ''
  queryParams.eventTitle = ''
  queryParams.contactPhone = ''
  queryParams.status = ''
  getList()
}

const handleView = (row) => {
  ElMessage.info(`查看订单: ${row.orderNumber}`)
}

const handleRefund = async (row) => {
  try {
    const { value } = await ElMessageBox.prompt('请输入退款原因', '退款', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '请输入退款原因'
    })
    
    ElMessage.success(`订单 ${row.orderNumber} 退款成功，原因: ${value}`)
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
.filter-container {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>