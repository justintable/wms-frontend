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
              <el-col :span="8">
                <el-form-item label="商品">
                  <el-select v-model="item.product" placeholder="选择商品">
                    <el-option label="测试商品1" value="P001" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数量">
                  <el-input-number v-model="item.quantity" :min="1" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单价">
                  <el-input-number v-model="item.price" :precision="2" :step="0.1" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

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
const handleSubmit = () => {
  // 这里添加提交逻辑
  ElMessage.success('新增入库单成功')
  dialogVisible.value = false
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