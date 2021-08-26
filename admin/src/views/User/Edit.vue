<!--
 * @Date: 2021-08-20 22:38:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 11:08:07
-->
<template>
  <div class="page">
    <div class="form">
      <h1>{{id?'编辑管理员':'新增管理员'}}</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-form-item label="头像">
           <el-upload
            class="avatar-uploader"
            :class="[form.avatar !== ''?'disabled':'' ]"
            action=""
            list-type="picture-card"
            :http-request="uploader"
            :file-list="file_list"
            :limit="1"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="昵称">
                <el-input type="text" v-model="form.nickname"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="用户名">
                <el-input type="text" v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
import uploader from '../../plugins/oss'
export default {
  props: {
    id: { type: String }
  },
  data(){
    return{
      form: {
        nickname: '',
        username: '',
        password: '',
        avatar: ''
      },
      file_list: []
    }
  },
  mounted(){
    this.id && this.getData()
  },
  methods:{
    async getData(){
      const res = await this.$api.getUser(this.id)
      // const res = await this.$http.get('rest/users/'+this.id)
      this.form = res.data
      this.file_list = [{name: '',url: this.form.avatar}]
    },
    async onSubmit(){
      console.log('提交')
      if(this.id){
        await this.$api.updateUser(this.id, this.form)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        await this.$api.createUser(this.form)
        this.$message({
          type: 'success',
          message: '创建成功'
        })
      }
      this.$router.push('/user/list')
    },
    async uploader(e){
      const avatar = await uploader(e.file)
      this.form.avatar = avatar
    },
    handleRemove() {
      this.form.avatar = ''
      this.file_list = []
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
    }
  }
}
.disabled .el-upload--picture-card {
  display: none;
}
</style>