<template>
  <div class="product-container">
    <h2>商品管理</h2>
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">新增商品</el-button>
    </div>
    
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="code" label="商品编码" width="120" />
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="spec" label="规格" width="120" />
      <el-table-column prop="unit" label="单位" width="80" />
      <el-table-column prop="price" label="价格" width="120" />
      <el-table-column prop="stock" label="库存" width="120" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增商品' : '编辑商品'"
      width="500px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="商品编码">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.spec" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

// 表格数据
const tableData = ref([])

// 对话框控制
const dialogVisible = ref(false)
const dialogType = ref('add')

// 表单数据
const form = reactive({
  code: '',
  name: '',
  category: '',
  spec: '',
  unit: '',
  price: 0,
  stock: 0
})

// 获取商品列表
const fetchProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/api/products')
  tableData.value = data
}

onMounted(fetchProducts)

// 新增商品
const handleAdd = () => {
  dialogType.value = 'add'
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  form.price = 0
  form.stock = 0
  dialogVisible.value = true
}

// 编辑商品
const handleEdit = (row) => {
  dialogType.value = 'edit'
  Object.keys(form).forEach(key => {
    form[key] = row[key]
  })
  dialogVisible.value = true
}

// 删除商品
const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除该商品吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里添加删除逻辑
    ElMessage.success('删除成功')
  })
}

// 提交表单
const handleSubmit = async () => {
  if (dialogType.value === 'add') {
    await axios.post('http://localhost:3001/api/products', form)
    ElMessage.success('新增成功')
    dialogVisible.value = false
    fetchProducts()
  } else {
    // 编辑逻辑略
    ElMessage.success('编辑成功')
    dialogVisible.value = false
  }
}
</script>

<style scoped>
.product-container {
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 