<template>
  <div class="ticket-form">
    <h2 class="page-title">添加票种</h2>
    
    <el-card>
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-width="100px"
        class="form-container"
      >
        <el-form-item label="活动" prop="eventId">
          <el-select v-model="form.eventId" placeholder="请选择活动">
            <el-option 
              v-for="event in eventOptions" 
              :key="event.id" 
              :label="event.title" 
              :value="event.id" 
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="票种名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入票种名称" />
        </el-form-item>
        
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        
        <el-form-item label="库存" prop="stock">
          <el-input-number v-model="form.stock" :min="0" />
        </el-form-item>
        
        <el-form-item label="票种描述">
          <el-input 
            v-model="form.description" 
            type="textarea" 
            :rows="4" 
            placeholder="请输入票种描述" 
          />
        </el-form-item>
        
        <div class="form-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="loading">提交</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formRef = ref()
const loading = ref(false)
const eventOptions = ref([])

const form = reactive({
  eventId: '',
  name: '',
  price: 0,
  stock: 0,
  description: ''
})

const rules = {
  eventId: [{ required: true, message: '请选择活动', trigger: 'change' }],
  name: [{ required: true, message: '请输入票种名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  stock: [{ required: true, message: '请输入库存', trigger: 'blur' }]
}

const handleCancel = () => {
  router.push('/tickets/list')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('添加成功')
    router.push('/tickets/list')
  } catch (error) {
    ElMessage.error('表单验证失败')
  } finally {
    loading.value = false
  }
}

const loadEventOptions = () => {
  // 模拟加载活动选项
  eventOptions.value = [
    { id: 1, title: '周杰伦2025巡回演唱会' },
    { id: 2, title: '国际动漫展' },
    { id: 3, title: '科技峰会2025' }
  ]
}

onMounted(() => {
  loadEventOptions()
})
</script>

<style scoped>
.form-container {
  max-width: 600px;
}

.form-footer {
  margin-top: 30px;
  text-align: center;
}
</style>