<template>
  <div class="inventory-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="code" label="商品编码" width="120" />
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="spec" label="规格" width="120" />
      <el-table-column prop="unit" label="单位" width="80" />
      <el-table-column prop="stock" label="库存数量" width="120" />
      <el-table-column prop="safeStock" label="安全库存" width="120" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.stock < scope.row.safeStock ? 'danger' : 'success'">
            {{ scope.row.stock < scope.row.safeStock ? '低于安全库存' : '正常' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    code: 'P001',
    name: '测试商品1',
    category: '电子产品',
    spec: '标准版',
    unit: '个',
    stock: 80,
    safeStock: 100
  },
  {
    code: 'P002',
    name: '测试商品2',
    category: '办公用品',
    spec: 'A4',
    unit: '包',
    stock: 120,
    safeStock: 50
  }
])
</script>

<style scoped>
.inventory-container {
  padding: 20px;
}
</style> 