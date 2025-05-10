<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="route.path"
          class="el-menu-vertical"
          :router="true"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/dashboard">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/product">
            <el-icon><Goods /></el-icon>
            <span>商品管理</span>
          </el-menu-item>
          <el-menu-item index="/inbound">
            <el-icon><Upload /></el-icon>
            <span>入库管理</span>
          </el-menu-item>
          <el-menu-item index="/outbound">
            <el-icon><Download /></el-icon>
            <span>出库管理</span>
          </el-menu-item>
          <el-menu-item index="/inventory">
            <el-icon><Box /></el-icon>
            <span>库存管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-right">
            <el-dropdown>
              <span class="el-dropdown-link">
                管理员
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { House, Goods, Upload, Download, Box, ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  router.push('/login')
}
</script>

<style scoped>
.app-wrapper {
  height: 100%;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.el-aside {
  background-color: #304156;
}

.el-menu {
  border-right: none;
}

.header-right {
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #409eff;
}
</style> 