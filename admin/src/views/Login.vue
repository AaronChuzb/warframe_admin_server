<!--
 * @Date: 2021-08-22 00:35:08
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 01:25:37
-->
<template>
  <div>
    <el-card class="login_card">
      <div slot="header">请先登录</div>
      <div>
        <el-form ref="form" :model="form" label-width="80px" label-position="top" @submit.native.prevent="login">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        username: '',
        password: ''
      }
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post('login', this.form)
      sessionStorage.setItem('token', res.data.token)
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style lang="less">
.login_card{
  width: 30rem;
  margin: 10rem auto;
}
</style>