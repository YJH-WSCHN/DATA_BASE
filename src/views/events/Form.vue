<template>
  <div class="event-form">
    <h2 class="page-title">{{ isEdit ? '编辑活动' : '创建活动' }}</h2>
    
    <el-card>
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-width="100px"
        class="form-container"
      >
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入活动标题" />
        </el-form-item>
        
        <el-form-item label="活动描述" prop="description">
          <el-input 
            v-model="form.description" 
            type="textarea" 
            :rows="4" 
            placeholder="请输入活动描述" 
          />
        </el-form-item>
        
        <el-form-item label="封面图片" prop="coverImage">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImage"
          >
            <img v-if="form.coverImage" :src="form.coverImage" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        
        <el-form-item label="活动地点" prop="venue">
          <el-input v-model="form.venue" placeholder="请输入活动地点" />
        </el-form-item>
        
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择分类">
            <el-option label="演唱会" value="1" />
            <el-option label="体育赛事" value="2" />
            <el-option label="话剧演出" value="3" />
            <el-option label="展览" value="4" />
            <el-option label="会议" value="5" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <div class="ticket-types">
          <h3 style="margin-bottom: 15px;">票种设置</h3>
          
          <div 
            v-for="(ticket, index) in form.ticketTypes" 
            :key="index" 
            class="ticket-type-item"
          >
            <div class="ticket-type-info">
              <el-form-item 
                label="票种名称" 
                :prop="`ticketTypes[${index}].name`" 
                :rules="ticketRules.name"
              >
                <el-input v-model="ticket.name" placeholder="请输入票种名称" style="width: 200px;" />
              </el-form-item>
              <el-form-item 
                label="价格" 
                :prop="`ticketTypes[${index}].price`" 
                :rules="ticketRules.price"
              >
                <el-input-number v-model="ticket.price" :min="0" :precision="2" />
              </el-form-item>
              <el-form-item 
                label="库存" 
                :prop="`ticketTypes[${index}].stock`" 
                :rules="ticketRules.stock"
              >
                <el-input-number v-model="ticket.stock" :min="0" />
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="ticket.description" placeholder="请输入票种描述" />
              </el-form-item>
            </div>
            <div class="ticket-type-actions">
              <el-button type="danger" @click="removeTicketType(index)" :disabled="form.ticketTypes.length <= 1">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
          
          <el-button @click="addTicketType">
            <el-icon><Plus /></el-icon>添加票种
          </el-button>
        </div>
        
        <div class="form-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            {{ isEdit ? '更新' : '创建' }}
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const formRef = ref()
const loading = ref(false)

const isEdit = computed(() => route.name === 'EventEdit')

const form = reactive({
  id: null,
  title: '',
  description: '',
  coverImage: '',
  startTime: '',
  endTime: '',
  venue: '',
  categoryId: '',
  status: 1,
  ticketTypes: [
    { name: '', price: 0, stock: 0, description: '' }
  ]
})

const rules = {
  title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
  description: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
  coverImage: [{ required: true, message: '请上传封面图片', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
  venue: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }]
}

const ticketRules = {
  name: [{ required: true, message: '请输入票种名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  stock: [{ required: true, message: '请输入库存', trigger: 'blur' }]
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isJPG && !isPNG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return false
  }
  return true
}

const uploadImage = (options) => {
  // 模拟上传
  setTimeout(() => {
    form.coverImage = 'https://example.com/uploaded-image.jpg'
    ElMessage.success('上传成功')
  }, 1000)
}

const addTicketType = () => {
  form.ticketTypes.push({ name: '', price: 0, stock: 0, description: '' })
}

const removeTicketType = (index) => {
  form.ticketTypes.splice(index, 1)
}

const handleCancel = () => {
  router.push('/events/list')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
    router.push('/events/list')
  } catch (error) {
    ElMessage.error('表单验证失败')
  } finally {
    loading.value = false
  }
}

const loadEventData = (id) => {
  // 模拟加载活动数据
  Object.assign(form, {
    id: id,
    title: '周杰伦2025巡回演唱会',
    description: '周杰伦2025巡回演唱会，经典歌曲全新演绎...',
    coverImage: 'https://example.com/cover.jpg',
    startTime: '2025-12-25 19:00:00',
    endTime: '2025-12-25 22:00:00',
    venue: '北京国家体育场',
    categoryId: '1',
    status: 1,
    ticketTypes: [
      { name: 'VIP票', price: 1280, stock: 100, description: 'VIP专属区域' },
      { name: '普通票', price: 680, stock: 500, description: '普通座位区域' }
    ]
  })
}

onMounted(() => {
  if (isEdit.value) {
    loadEventData(route.params.id)
  }
})
</script>

<style scoped>
.form-container {
  max-width: 800px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ticket-types {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.ticket-type-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fafafa;
}

.ticket-type-info {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.ticket-type-actions {
  margin-left: 15px;
  display: flex;
  align-items: flex-start;
}

.form-footer {
  margin-top: 30px;
  text-align: center;
}
</style>