<!--
 * @Date: 2021-08-25 11:46:02
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 17:58:38
-->
<template>
  <div>
    <h1>遗物部件列表</h1>
    <div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search" @change="searchContent"></el-input>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-button style="width: 100%" type="primary" @click="$router.push('/primepart/edit')">新增部件</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="types" size="small">
      <el-table-column align="center" prop="name" label="部件名"></el-table-column>
      <el-table-column align="center" prop="createdAt" label="创建时间" >
        <template slot-scope="scope">
          <p>{{ $util.formatTime(scope.row.createdAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="更新时间">
        <template slot-scope="scope">
          <p>{{ $util.formatTime(scope.row.updatedAt) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="creator.nickname" label="创建者"></el-table-column>
      <el-table-column align="center" prop="updater.nickname" label="更新者"></el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/primepart/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click=" remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 10px">
      <el-pagination
          background
          layout="sizes, prev, pager, next, jumper"
          :page-sizes="[5, 10, 15, 20]"
          @prev-click="pageChange"
          @next-click="pageChange"
          @current-change="pageChange"
          @size-change="pageSizeChange"
          :page-size="pageSize"
          :total="dataTotal">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      types:[],
      page: 1,
      pageSize: 5,
      dataTotal: 0,
      search: '',
      feilds: [ 'name' ]
    }
  },
  methods:{
    /**
     * 跳页
     * @param e {Number} 当前页
     */
    pageChange(e){
      console.log(e)
      this.page = e
      this.getData()
    },
    /**
     * 更改页大小
     * @param e {Number} 一页的大小
     */
    pageSizeChange(e){
      console.log(e)
      this.page = 1
      this.pageSize = e
      this.getData()
    },
    
    /**
     * @description: 搜索
     */
    searchContent(){
      this.page = 1
      this.getData()
    },
    /**
     * @description: 获取数据
     */
    async getData(){
      const res = await this.$api.getPrimePart(this.page, this.pageSize, this.feilds, this.search)
      console.log(res)
      this.types = res.data.data
      this.dataTotal = res.data.counts
    },

    async remove(row){
      console.log(row)
      this.$confirm(`是否删除 "${row.name}"`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        await this.$api.delPrimePart(this.select, row._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        await this.getData()
      })
    }
  },

  created(){
    this.getData()
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>