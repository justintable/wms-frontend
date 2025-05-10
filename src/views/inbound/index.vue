<template>
  <div class="inbound-container">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">新增入库单</el-button>
    </div>
    
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="code" label="入库单号" width="180" />
      <el-table-column prop="date" label="入库日期" width="180" />
      <el-table-column prop="type" label="入库类型" width="120" />
      <el-table-column prop="supplier" label="供应商" width="180" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleView(scope.row)">查看</el-button>
          <el-button 
            size="small" 
            type="primary" 
            v-if="scope.row.status === '待入库'"
            @click="handleConfirm(scope.row)"
          >
            确认入库
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增入库单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增入库单"
      width="800px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="入库类型">
          <el-select v-model="form.type" placeholder="请选择入库类型">
            <el-option label="采购入库" value="采购入库" />
            <el-option label="退货入库" value="退货入库" />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="form.supplier" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" />
        </el-form-item>
        
        <el-divider>入库商品</el-divider>
        
        <div class="product-list">
          <div v-for="(item, index) in form.products" :key="index" class="product-item">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="商品">
                  <el-select
                    v-model="item.product"
                    placeholder="选择商品"
                    style="width: 100%;"
                    @change="val => handleProductChange(val, item)"
                  >
                    <el-option
                      v-for="prod in productOptions"
                      :key="prod.code"
                      :label="prod.name"
                      :value="prod.code"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数量">
                  <el-input-number
                    v-model="item.quantity"
                    :min="1"
                    :step="1"
                    style="width: 320px;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单价">
                  <el-input-number
                    v-model="item.price"
                    :precision="2"
                    :step="0.1"
                    :min="0"
                    style="width: 320px;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="danger" @click="removeProduct(index)">删除</el-button>
              </el-col>
            </el-row>
          </div>
          <el-button type="primary" @click="addProduct">添加商品</el-button>
        </div>
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
import { ElMessage } from 'element-plus'
import axios from 'axios'

// 表格数据
const tableData = ref([
  {
    code: 'IN001',
    date: '2024-05-10',
    type: '采购入库',
    supplier: '测试供应商',
    status: '待入库'
  }
])

// 对话框控制
const dialogVisible = ref(false)

// 表单数据
const form = reactive({
  type: '',
  supplier: '',
  remark: '',
  products: []
})

// 新增入库单
const handleAdd = () => {
  form.type = ''
  form.supplier = ''
  form.remark = ''
  form.products = []
  dialogVisible.value = true
}

// 添加商品
const addProduct = () => {
  form.products.push({
    product: '',
    quantity: 1,
    price: 0
  })
}

// 删除商品
const removeProduct = (index) => {
  form.products.splice(index, 1)
}

// 查看入库单
const handleView = (row) => {
  // 这里添加查看逻辑
  ElMessage.info('查看入库单：' + row.code)
}

// 确认入库
const handleConfirm = (row) => {
  // 这里添加确认入库逻辑
  ElMessage.success('入库成功：' + row.code)
}

// 提交表单
const handleSubmit = async () => {
  // 提交前将商品明细的price和quantity转为数字类型
  const products = form.products.map(item => ({
    ...item,
    price: Number(item.price),
    quantity: Number(item.quantity)
  }))
  const inboundData = {
    code: 'IN' + Date.now(),
    date: new Date().toISOString().slice(0, 10),
    type: form.type,
    supplier: form.supplier,
    status: '待入库',
    remark: form.remark,
    products
  }
  try {
    await axios.post('http://localhost:3001/api/inbounds', inboundData)
    ElMessage.success('新增入库单成功')
    dialogVisible.value = false
    // 新增后立即刷新表格
    await fetchInbounds()
  } catch (err) {
    ElMessage.error('新增失败: ' + (err.response?.data?.error || err.message))
  }
}

const fetchInbounds = async () => {
  const { data } = await axios.get('http://localhost:3001/api/inbounds')
  tableData.value = data
}

const productOptions = ref([])
const fetchProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/api/products')
  productOptions.value = data
}

// 页面加载时自动获取
onMounted(fetchInbounds)
onMounted(fetchProducts)

const handleProductChange = (code, item) => {
  const prod = productOptions.value.find(p => p.code === code)
  if (prod) {
    item.price = prod.price || 0 // 自动带出商品价格
    // 你也可以带出单位、规格等
  }
}
</script>

<style scoped>
.inbound-container {
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.product-list {
  margin: 20px 0;
}

.product-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 