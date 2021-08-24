<!--
 * @Date: 2021-08-24 17:21:10
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 22:29:10
-->
<template>
  <div class="page">
    <div class="form">
      <h1>编辑OSS信息</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="region">
                <el-input type="text" v-model="form.region"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="bucket">
                <el-input type="text" v-model="form.bucket"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="accessKeyId">
                <el-input type="text" v-model="form.accessKeyId"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="accessKeySecret">
                <el-input type="password" v-model="form.accessKeySecret"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">{{ form.accessKeyId === ''?'添加':'修改' }}</el-button>
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
        region: '',
        bucket: '',
        accessKeyId: '',
        accessKeySecret: ''
      },
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    async getData(){
      const res = await this.$http.get('rest/osses')
      this.form = res.data.data[0]
    },
    async onSubmit(){
      if(this.form.accessKeyId !== ''){
        await this.$http.put('rest/osses/'+this.id, this.form)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        await this.$http.post('rest/osses', this.form)
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