<!--
 * @Date: 2021-08-20 21:03:40
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-01 15:28:11
-->
<template>
  <div>
    <!-- 导航列表 -->
    <el-container style="height: 100vh;">
      <el-aside style="width: 230px">
        <el-menu router style="min-height: 100vh" :default-active="$route.path" background-color="#1e1e1e" text-color="#fff" active-text-color="#41b883">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">基础内容</span>
            </template>
            <el-menu-item index="/category/list">基础分类</el-menu-item>
            <el-menu-item index="/part/list">遗物部件</el-menu-item>
            <el-menu-item index="/resource/list">基本资源</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">进阶内容</span>
            </template>
            <!-- <el-menu-item index="/part/list">星球&比邻星域</el-menu-item> -->
            <el-menu-item index="/remain/list">遗物</el-menu-item>
            <!-- <el-menu-item index="/warframe/list">战甲</el-menu-item>
            <el-menu-item index="/weapon/list">武器</el-menu-item>
            <el-menu-item index="/mod/list">Mod</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统设置</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户管理</template>
              <el-menu-item index="/user/list">管理员列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">秘钥管理</template>
              <el-menu-item index="/secret/miniapp">小程序</el-menu-item>
              <el-menu-item index="/secret/oss">OSS</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="left"></div>
          <div class="right">
            <div>
              <div class="nickname">{{ user.nickname }}</div>
              <div class="username">{{ user.username }}</div>
            </div>
            <el-dropdown @command="handleCommand">
              <el-avatar size="large" :src="user.avatar"></el-avatar>
              <el-dropdown-menu>
                <!-- <div style="height: 50px;width: 50px"></div> -->
                <el-dropdown-item command="profile"><i class="el-icon-s-operation"></i>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout"><i class="el-icon-s-operation"></i> 退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 页面内容 -->
        <el-main style="padding: 0 2vw">
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList: [],
      user: {
        username: "aaronchu",
        nickname: "AaronChu",
        avatar: "",
      },
      isCollapse: true,
    };
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  methods: {
    handleCommand(e) {
      console.log(e);
      if (e === "logout") {
        sessionStorage.clear();
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出登录成功",
        });
      }
    },
  },
};
</script>

<style lang="less">
.el-header {
  background-color: #ffffff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .nickname {
    font-size: 16px;
    color: #222222;
    font-weight: bold;
  }
  .username {
    font-size: 14px;
    color: #333333;
  }
  .el-avatar {
    margin-left: 15px;
  }
}

.el-aside {
  color: #333;
  padding: 0;
  width: 200px;
}
.title {
  height: 100px;
  background-color: #545c64;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 150px;
    display: block;
  }
}
</style>
