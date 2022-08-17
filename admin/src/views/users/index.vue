<template>
  <div class="app-container">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input v-model="search" placeholder="按昵称或游戏ID搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-tooltip class="item" effect="dark" content="登录平台" placement="top-start">
        <el-select v-model="platform" style="width: 140px; margin-right: 10px" class="filter-item" @change="searchList">
          <el-option v-for="item in platforms" :key="item.name" :label="item.name" :value="item.value" />
        </el-select>
      </el-tooltip>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
     <el-table-column width="150px" label="头像" align="center">
        <template slot-scope="{ row }">
          <el-avatar shape="square" size="large" fit="contain" :src="row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="昵称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="游戏ID" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.gameId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="登录平台" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.platForm == 'weixin'?'微信小程序':'QQ小程序' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <!-- <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="getInfo(row)">编辑</el-button> -->
          <el-button type="warning" size="small" icon="el-icon-edit-outline" v-if="row.canLogin" @click="changeUserStatus(1, row)">停用</el-button>
          <el-button type="success" size="small" icon="el-icon-edit-outline" v-else @click="changeUserStatus(2, row)">启用</el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete" @click="deleteItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
    <!-- 新增或者编辑 -->
  </div>
</template>
<script>
import { list, changeStatus } from "@/api/client_user";
import Pagination from "@/components/Pagination";
import { asyncRoutes } from "@/router";
export default {
  name: "user",
  components: { Pagination },
  data() {
    return {
      platforms: [
        {
          name: '全部平台',
          value: ''
        },
        {
          name: '微信小程序',
          value: 'weixin'
        },
        {
          name: 'QQ小程序',
          value: 'qq'
        }
      ],

      
      table: [], // 存放列表的数据
      page: 1, // 获取的数据的页数
      pageSize: 10, // 一页的数据长度,默认10条
      search: "", // 搜索的关键字
      platform: "",
      counts: 0, // 获取的数据总条数
      listLoading: false, // 列表加载状态
      
      
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    
    /**
     * @description: 变更用户是否可以登录
     * @param {Number} type 类型，是启用还是停用
     * @param {Object} row 一行的数据
     */
    async changeUserStatus(type, row) {
      let status = true;
      let notice = "启用";
      if (type == 1) {
        status = false;
        notice = "停用";
      }
      await changeStatus(row._id, status);
      this.$message({
        type: "success",
        message: `${notice}”${row.nickname}“成功!`,
      });
      await this.getData();
    },
    
    
    /**
     * @description: 搜索列表
     * @param {*} e
     */
    searchList(e) {
      this.page = 1;
      this.getData();
    },
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search, this.platform);
      this.table = res.data;
      this.counts = res.counts;
      this.listLoading = false;
    }
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  transform: translate(0, -50%);
  right: 15px;
  top: 50%;
}
.filter-container {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.upload-button {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 2px dashed #666;
  position: relative;
  cursor: pointer;
}
.upload-plus {
  font-size: 40px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}
.upload-name {
  font-size: 10px;
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 2px;
  left: 50%;
  width: 100%;
  text-align: center;
}
.avatar {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}
</style>
