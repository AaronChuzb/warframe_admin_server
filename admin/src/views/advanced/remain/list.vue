<!--
 * @Date: 2021-09-13 17:24:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-14 18:25:15
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按名称搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="排序方式" placement="top-start">
        <el-select v-model="sort" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in sortOptions" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="遗物分类" placement="top-start">
        <el-select v-model="type" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in typeOptions" :key="item._id" :label="item.name" :value="item.index" />
        </el-select>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="更新者" placement="top-start">
        <el-select v-model="user" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in userOptions" :key="item._id" :label="item.nickname" :value="item.index" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="openEdit">
        新增遗物
      </el-button>
    </div>
    <transition name="el-fade-in-linear">
      <div class="remain-box" v-show="counts > 0">
        <el-row :gutter="20">
          <el-col :span="4" v-for="(item, index) in table" :key="index" class="item">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="chooseImage(item.type.name)" class="image" />
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="editRow(item._id)">编辑</el-button>
                  <el-button type="text" class="button danger" @click="deleteItem(item)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </transition>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :pageSizes="[6, 12, 18, 24]" :limit.sync="pageSize" @pagination="getData" />
    <transition name="el-fade-in-linear">
      <el-empty description="暂无更多" v-show="counts == 0"></el-empty>
    </transition>
    <!-- 新增 -->
    <new-item ref="edit" :show="showNewItem" @done="(showNewItem = false), getData()" @cancle="showNewItem = false" />
  </div>
</template>
<script>
import { list, deleted, getType } from "@/api/remain";
import Pagination from "@/components/Pagination";
import newItem from "./components/edit.vue";
export default {
  name: "InlineEditTable",
  components: { Pagination, newItem },
  data() {
    return {
      table: [],
      sortOptions: [
        { key: { updatedAt: -1 }, label: "更新时间倒序", id: 0 },
        { key: { updatedAt: 1 }, label: "更新时间正序", id: 1 },
        { key: { createdAt: 1 }, label: "创建时间正序", id: 2 },
        { key: { createdAt: -1 }, label: "创建时间倒叙", id: 3 },
      ],
      userOptions: [{ _id: "", index: 0, nickname: "所有人" }],
      typeOptions: [{ _id: "", index: 0, name: "所有分类" }],
      type: 0,
      user: 0,
      sort: 0,
      page: 1,
      pageSize: 12,
      search: "",
      counts: 0,
      listLoading: false,
      showNewItem: false,
    };
  },
  async created() {
    this.getData();
    console.log(this.table)
    const res = await getType();
    console.log(res);
    if (this.typeOptions.length < 2) {
      this.typeOptions = this.typeOptions.concat(
        res.map((e, index) => {
          e.index = index + 1;
          return e;
        })
      );
    }
  },
  methods: {
    /**
     * @description: 打开新增
     */
    openEdit() {
      this.showNewItem = true;
      this.$refs.edit.getPreData();
    },
    /**
     * @description: 打开编辑
     * @param {String} id 改遗物的_id
     */
    editRow(id) {
      this.showNewItem = true;
      this.$refs.edit.getInfoAndEdit(id);
    },
    /**
     * @description: 获取对应类型的图片
     * @param {String} name 类型名
     * @return {*} 图片路径
     */
    chooseImage(name){
      let img
      if(name == '丽斯'){
        img = 'ls'
      } else if (name == '美索'){
        img = 'ms'
      } else if (name == '尼奥'){
        img = 'na'
      } else if (name == '亚希'){
        img = 'yx'
      } else if (name == '安魂'){
        img = 'ah'
      }
      return require(`@/assets/${img}.png`)
    },
    /**
     * @description: 删除一行数据
     * @param {Object} row 表格行数据
     */
    deleteItem(row) {
      this.$confirm(`确定删除“${row.name}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleted(row._id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getData();
      });
    },

    /**
     * @description: 搜索列表
     * @param {*} e
     */
    searchList(e) {
      this.page = 1;
      this.getData();
    },

    /**
     * @description: 获取页面数据
     */
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search, this.sortOptions[this.sort].key, this.userOptions[this.user]._id, this.typeOptions[this.type]._id);
      this.table = res.data
      if (this.userOptions.length < 2) {
        this.userOptions = this.userOptions.concat(
          res.userOptions.map((e, index) => {
            e.index = index + 1;
            return e;
          })
        );
      }
      this.counts = res.counts;
      this.listLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.remain-box {
  .item {
    margin-bottom: 15px;
  }
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
.danger {
  color: #f56c6c;
  margin-right: 10px;
}

.image {
  width: 100%;
  display: block;
  background: #999;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
