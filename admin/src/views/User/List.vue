<!--
 * @Date: 2021-08-20 22:39:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-22 00:55:40
-->
<template>
  <div>
    <h1>管理员列表</h1>
     <el-table :data="users">
      <el-table-column prop="_id" label="ID" width="220">
      </el-table-column>
      <el-table-column prop="username" label="战甲名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/user/edit/id=${scope.row._id}}`)">编辑</el-button>
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
      users:[]
    }
  },
  methods:{
    async getData(){
      const res = await this.$http.get('rest/users')
      console.log(res)
      this.users = res.data
    },
    async remove(row){
      this.$confirm(`是否删除 "${row.name}"`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const res = await this.$http.delete('rest/users/'+row._id)
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