<!--
 * @Date: 2021-08-20 21:03:40
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-20 23:37:41
-->
<template>
  <div>
    <!-- 导航列表 -->
    <el-container style="height: 100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1', '3']" style="min-height: 100vh">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">战甲</template>
              <el-menu-item index="/warframe/list">战甲列表</el-menu-item>
              <el-menu-item index="/warframe/edit">新增战甲</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-container>
        <!-- 头部 -->
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <!-- 页面内容 -->
        <el-main style="padding: 0 2vw">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style lang="less">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>