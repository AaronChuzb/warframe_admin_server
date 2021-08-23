<!--
 * @Date: 2021-08-20 22:39:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 10:08:35
-->
<template>
  <div>
    <h1>战甲列表</h1>
    <div></div>
    <el-table :data="warframes">
      <el-table-column align="center" prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column align="center" prop="name" label="战甲名称"></el-table-column>
      <el-table-column align="center" prop="createdAt" label="创建时间" >
        <template slot-scope="scope">
          <p>{{ formatTime(scope.row.createdAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="更新时间">
        <template slot-scope="scope">
          <p>{{ formatTime(scope.row.updatedAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/warframe/edit/id=${scope.row._id}}`)">编辑</el-button>
          <el-button type="danger" size="small" @click=" remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      warframes:[]
    }
  },
  methods:{
    formatTime(time){
      var date = new Date(time); // 初始化日期
      var year = date.getFullYear(); //获取年份
      var month = date.getMonth() + 1; // 获取月份
      var day = date.getDate(); // 获取具体日
      var hour = date.getHours(); // 获取时
      var minutes = date.getMinutes(); // 获取分
      var seconds = date.getSeconds(); // 获取秒
      return year + '年' + month + '月' + day + '日 ' +  hour + '时' + minutes + '分' + seconds + '秒'
    },
    async getData(){
      const res = await this.$http.get('rest/warframes', { params: { page: 1, pageSize: 10, params: { name: '圣剑' } } } )
      console.log(res)
      this.warframes = res.data.data
    },
    async remove(row){
      this.$confirm(`是否删除 "${row.name}"`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const res = await this.$http.delete('rest/warframes/'+row._id)
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getData()
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style>

</style>