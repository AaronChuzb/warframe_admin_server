<!--
 * @Date: 2021-08-24 17:21:10
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 22:30:55
-->
<template>
  <div class="page">
    <div class="form">
      <h1>编辑小程序信息</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="AppID">
                <el-input type="text" v-model="form.appId"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="AppSecret">
                <el-input type="password" v-model="form.appSecret"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
        appId: '',
        appSecret: ''
      },
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    async getData(){
      const res = await this.$http.get('rest/apps')
      this.form = res.data.data[0]
    },
    async onSubmit(){
      // 有app秘钥信息，编辑
      if(this.form.appId !== ''){
        await this.$http.put('rest/apps/'+this.id, this.form)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else { // 没有秘钥信息，修改
        await this.$http.post('rest/apps', this.form)
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },
    uploader(e){
      uploader(e.file).then(res=>{
        this.form.avatar = res
      })
    },
    handleRemove() {
      this.form.avatar = ''
      this.file_list = []
    },
  }
}
</script>

<style lang="less">