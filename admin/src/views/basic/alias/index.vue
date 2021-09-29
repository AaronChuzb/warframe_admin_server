<!--
 * @Date: 2021-09-28 17:17:10
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-29 14:33:40
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="更新者" placement="top-start">
        <el-select v-model="user" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in userOptions" :key="item._id" :label="item.nickname" :value="item.index" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">
        新增别名转换
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <!-- 原名称 -->
      <el-table-column width="200" align="center" label="原名称">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <!-- 别名标签 -->
      <el-table-column min-width="200" align="center" label="别名">
        <template slot-scope="{ row }">
          <el-tag :key="tag" v-for="tag in row.alias" :closable="row.edit" :disable-transitions="false" @close="removeAlias(row, tag)">
            {{ tag }}
          </el-tag>
          <el-input class="input-new-tag" v-if="row.showInputAlias" v-model="newAlias" ref="saveAliasInput" size="small" @keyup.enter.native="saveNewAlias(row)" @blur="saveNewAlias(row)"> </el-input>
          <el-button v-if="!row.showInputAlias && row.edit" class="button-new-tag" size="small" @click="showInput(row)">+ 新别名</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="160">
        <template slot-scope="{ row }">
          <span>{{ $parseTime(row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{ row }">
          <el-button v-if="row.edit" type="success" size="small" icon="el-icon-document-checked" @click="confirmEdit(row)">保存</el-button>
          <el-button v-if="row.edit" size="small" icon="el-icon-document-remove" type="warning" @click="cancelEdit(row)">取消</el-button>
          <el-button v-if="!row.edit" type="primary" size="small" icon="el-icon-edit-outline" @click="preEdit(row)">编辑</el-button>
          <el-button v-if="!row.edit" type="danger" size="small" icon="el-icon-document-delete" @click="deleteItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
    <!-- 新增 -->
    <new-alias :show="showNewItem" @cancle="showNewItem = false" @done="getData(), (showNewItem = false)"></new-alias>
  </div>
</template>
<script>
import { list, change, deleted } from '@/api/alias'
import Pagination from '@/components/Pagination'
import NewAlias from './components/new.vue'
export default {
  name: 'alias',
  components: { Pagination, NewAlias },
  data() {
    return {
      table: [],
      userOptions: [{ _id: '', index: 0, nickname: '所有人' }],
      user: 0,
      page: 1,
      pageSize: 10,
      search: '',
      counts: 0,
      listLoading: false,
      showNewItem: false,
      newAlias: '',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    /**
     * @description: 删除一行数据
     * @param {Object} row 表格行数据
     */
    deleteItem(row) {
      this.$confirm(`确定删除“${row.name}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleted(row._id)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.getData()
      })
    },

    /**
     * @description: 搜索列表
     * @param {*} e
     */
    searchList(e) {
      this.page = 1
      this.getData()
    },

    /**
     * @description: 准备编辑
     * @param {Object} row
     * @return {*}
     */
    preEdit(row) {
      row.edit = !row.edit
      row.tempName = JSON.parse(JSON.stringify(row.name))
      row.tempAlias = JSON.parse(JSON.stringify(row.alias))
    },

    /**
     * @description: 移除别名
     * @param {Object} row 该行数据，引用类型
     * @param {String} tag 标签名
     */
    removeAlias(row, tag) {
      row.alias.splice(row.alias.indexOf(tag), 1)
    },

    /**
     * @description: 添加新标签
     * @param {Object} row 该行数据
     */
    showInput(row) {
      row.showInputAlias = true
      this.$nextTick(_ => {
        this.$refs.saveAliasInput.$refs.input.focus()
      })
    },

    /**
     * @description: 保存新标签
     * @param {Object} row 该行数据
     */
    saveNewAlias(row) {
      let newAlias = this.newAlias
      if (newAlias) {
        row.alias.push(newAlias)
      }
      row.showInputAlias = false
      this.newAlias = ''
    },

    /**
     * @description: 取消编辑
     * @param {Object} row
     */
    cancelEdit(row) {
      row.name = row.tempName
      row.alias = row.tempAlias
      row.alias.splice(1, 0)
      row.edit = false
      this.$message({
        message: '用户取消编辑',
        type: 'warning',
      })
    },
    /**
     * @description: 提交编辑
     * @param {Object} row
     */
    async confirmEdit(row) {
      this.saveNewAlias()
      row.edit = false
      row.tempName = row.name
      row.tempAlias = row.alias
      // 深拷贝一下,如果是浅拷贝会删去原来列表中的值,导致不能二次更改
      let data = JSON.parse(JSON.stringify(row))
      // 删除对象多余元素
      delete data.edit
      delete data.tempName
      delete data.tempAlias
      // 将数据中的数组转换成,连接的字符串
      data.alias = data.alias.join(',')
      await change(row._id, data)
      this.$message({
        message: '编辑成功',
        type: 'success',
      })
    },
    /**
     * @description: 获取表格数据
     */
    async getData() {
      this.listLoading = true
      const res = await list(this.page, this.pageSize, this.search, this.userOptions[this.user]._id)
      this.table = res.data.map(e => {
        e.edit = false
        e.alias = e.alias.split(',')
        e.showInputAlias = false
        return e
      })
      if (this.userOptions.length < 2) {
        this.userOptions = this.userOptions.concat(
          res.userOptions.map((e, index) => {
            e.index = index + 1
            return e
          })
        )
      }
      this.counts = res.counts
      this.listLoading = false
    },
  },
}
</script>

<style scoped>
.edit-input {
  text-align: center;
}
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
