<!--
 * @Date: 2021-08-20 22:38:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 00:55:21
-->
<template>
  <div class="page">
    <div class="form">
      <h1>{{id?'编辑管理员':'新增管理员'}}</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-form-item label="用户名">
            <el-input type="text" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">提交数据</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data(){
    return{
      form: {
        username: '',
        password: ''
      },
    }
  },
  mounted(){
    this.id && this.getData()
  },
  methods:{
    async getData(){
      const res = await this.$http.get('rest/users/'+this.id)
      console.log(res)
      this.form = res.data
    },
    async onSubmit(){
      let res
      if(this.id){
        res = await this.$http.put('rest/users/'+this.id, this.form)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        res = await this.$http.post('rest/users', this.form)
        this.$message({
          type: 'success',
          message: '创建成功'
        })
      }
      console.log(res)
      this.$router.push('/user/list')
      
    },
  }
}
</script>

<style lang="less">
  .page{
  background: #f2f2f2;
  width: 100%;
  .form{
    .item{
      padding: 2vw;
      background: #fff;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
      margin-bottom: 2vw;
      .title{
        font-weight: bold !important;
        
      }
      .skills{
        clear: both;
        padding: 2vw;
        border: 1px solid #DCDFE6;
        border-radius: 10px;
        margin-bottom: 2vw;
      }
      
    }
  }
}
.editor{
  width: 375px;
  margin: 0 auto;
}
</style>