<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>商品总数</span>
            </div>
          </template>
          <div class="card-body">
            <h2>0</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>今日入库</span>
            </div>
          </template>
          <div class="card-body">
            <h2>0</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>今日出库</span>
            </div>
          </template>
          <div class="card-body">
            <h2>0</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>库存预警</span>
            </div>
          </template>
          <div class="card-body">
            <h2>0</h2>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  text-align: center;
  padding: 20px 0;
}

.card-body h2 {
  margin: 0;
  font-size: 24px;
  color: #409eff;
}
</style> 