<!--
 * @Date: 2021-09-27 17:17:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:39:51
-->
<template>
  <div class="app-container">
    <Title title="基本信息"></Title>
    <div class="info-box">
      <img :src="$store.getters.avatar" alt="头像" />
      <div class="info">
        <div class="name">昵称：{{ $store.getters.name }}</div>
        <div>
          <div class="username">账号：{{ $store.getters.username }}</div>
          <div class="game">游戏内ID：{{ $store.getters.game_id }}</div>
        </div>
      </div>
    </div>
    <Title title="补充信息"></Title>
    <el-row :gutter="50" style="margin-top:20px">
      <el-col :span="12" :xs="24" :sm="12">
        <div class="box">
          <div class="left">
            <div class="icon-box"><i class="el-icon-edit"></i></div>
            <div>
              <div>游戏内ID</div>
              <div class="tips">用于识别您的身份</div>
            </div>
          </div>
          <div class="right">
            <div class="content">{{ $store.getters.game_id }}</div>
            <el-button type="primary">设置</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :xs="24" :sm="12">
        <div class="box">
          <div class="left">
            <div class="icon-box"><i class="el-icon-phone"></i></div>
            <div>
              <div>联系方式</div>
              <div class="tips">与我保持联系</div>
            </div>
          </div>
          <div class="right">
            <div class="content">{{ $store.getters.contact }}</div>
            <el-button type="primary">设置</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50" style="margin-top:20px">
      <el-col :span="12" :xs="24" :sm="12">
        <div class="box">
          <div class="left">
            <div class="icon-box"><i class="el-icon-warning"></i></div>
            <div>
              <div>修改密码</div>
              <div class="tips">密码将以无法逆向解析的无规则字符串保存，请放心更改。</div>
            </div>
          </div>
          <div class="right">
            <el-button @click="showPassChange = true">修改</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <Title title="个人权限"></Title>
    <div class="roles">
      <el-tag type="success" style="margin-right: 10px; margin-bottom: 5px" v-for="item in $store.getters.roles" :key="item">{{ transRole(item) }}</el-tag>
    </div>
    <Pass :show="showPassChange" @cancle="showPassChange = false"></Pass>
    <Contact :show="showContactChange" @cancle="showContactChange = false"></Contact>
  </div>
</template>

<script>
import Title from './components/title.vue'
import Pass from './components/pass.vue'
import Contact from './components/contact.vue'
import { asyncRoutes } from "@/router";
export default {
  components: {
    Title,
    Pass,
    Contact
  },
  data(){
    return{
      permissionTrans: [], // 用来转换权限中英文的数组
      showPassChange: false,
      showContactChange: false
    }
  },
  async created() {
    // 循环异步路由获取权限列表
    asyncRoutes.forEach((item, index) => {
      if (item.meta) {
        this.permissionTrans.push({
          title: item.meta.title,
          role: item.meta.role,
        });
        item.children.forEach((child) => {
          this.permissionTrans.push({
            title: child.meta.title,
            role: child.meta.role,
          });
        });
      }
    });
  },
  methods:{
    /**
     * @description: 替换权限英文为中文
     * @param {String} en 权限的英文名
     */
    transRole(en) {
      if (en == "all") {
        return "超级管理员";
      }
      for (let i = 0; i < this.permissionTrans.length; i++) {
        if (this.permissionTrans[i].role == en) {
          return this.permissionTrans[i].title;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-box {
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  img {
    width: 100px;
    border-radius: 8px;
  }
  .info {
    height: 100px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: gray;
    .name {
      font-size: 24px;
      font-weight: bold;
      color: #383838;
      margin-top: 10px;
    }
    .game {
      margin-top: 8px;
    }
  }
}
.box {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .tips {
      color: #999;
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background: #383838;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 22px;
    margin-right: 10px;
  }
  .right {
    display: flex;
    align-items: center;
    .content {
      margin-right: 15px;
      font-size: 20px;
    }
  }
}
.roles{
  margin-top: 20px;
}
</style>
