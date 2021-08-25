<!--
 * @Date: 2021-08-20 22:38:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 17:45:00
-->
<template>
  <div class="page">
    <div class="form">
      <h1>{{id?'编辑遗物部件':'新增遗物部件'}}</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="部件名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="部件类型">
                <el-select v-model="form.type" placeholder="请选择遗物类型">
                  <el-option :label="item.name" :value="item._id" v-for="item in part_type" :key="item._id"></el-option>
                </el-select>
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
      part_type: [],
      page: 1,
      pageSize: 999,
      feilds: [],
      search: '',
      form: {
        name: '', // 部件名称
        type: '', // 部件类型
      },
      num: 0,
      
    }
  },
  async mounted(){
    const res = await this.$api.getPrimePartType(this.page, this.pageSize, this.feilds, this.search)
    console.log(res)
    this.part_type = res.data.data
    this.id && this.getData()
  },
  methods:{
    async getData(){
      const res = await this.$http.get('rest/prime_parts/'+this.id)
      this.form = res.data
      this.file_list = [{name: '',url: this.form.img}]
    },
    querySearch(queryString, cb) {
      var results = [queryString];
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    async onSubmit(){
      if(this.id){
        await this.$http.put('rest/prime_parts/'+this.id, this.form)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        await this.$http.post('rest/prime_parts', this.form)
        this.$message({
          type: 'success',
          message: '创建成功'
        })
      }
      this.$router.push('/primepart/list')
    },
    async uploader(e){
      console.log(e)
      const url = await uploader(e.file)
      this.form.img.push(url)
    }
  },
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