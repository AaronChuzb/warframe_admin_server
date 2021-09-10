<!--
 * @Date: 2021-09-02 12:27:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-10 18:06:48
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="按昵称或账号搜索" style="width: 250px; margin-right: 10px" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-plus" @click="showNewItem = true">
        新增管理员
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="table" border fit highlight-current-row style="width: 100%">
      <el-table-column width="150px" label="昵称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="管理员头像" align="center">
        <template slot-scope="{ row }">
          <el-avatar shape="square" size="large" :src="row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限">
        <template slot-scope="{ row }">
          <span>{{ $parseTime(row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" icon="el-icon-edit-outline">
            编辑
          </el-button>
          <el-button type="warning" size="small" icon="el-icon-edit-outline">
            停用
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-document-delete" @click="deleteItem(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="counts > 0" :total="counts" :page.sync="page" :limit.sync="pageSize" @pagination="getData" />
    <!-- 新增或者编辑 -->
    <el-dialog title="新增管理员" :visible.sync="showNewItem">
      <el-form :model="user" :rules="rules" ref="part">
        <el-tabs>
          <el-tab-pane label="基础信息">
            <el-row :gutter="20">
              <el-col :span="12" >
                <el-upload
                v-if="user.avatar == ''"
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="1">
                  <div class="upload-button" >
                  <div class="upload-plus">+</div>
                  <div class="upload-name">上传头像</div>
                </div>
                </el-upload>
                
                <el-avatar v-else shape="square" :size="80" fit="fill" :src="user.avatar"></el-avatar>
              </el-col>
              <el-col :span="12">
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="user.nickname" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="账户" prop="name">
                  <el-input v-model="user.username" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" prop="name">
                  <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="权限配置">
            <el-form-item prop="name">
              <el-collapse accordion>
                <el-collapse-item v-for="(item, index) in permissions" :key="index">
                  <template slot="title">{{ item.title }}<i v-if="item.role == 'setting'" class="header-icon el-icon-info"></i> </template>
                  <el-checkbox-group v-model="user.roles" @change="roleChange(item)">
                    <el-checkbox v-for="child in item.children" :label="child.role" :key="child.role">{{ child.title }}</el-checkbox>
                  </el-checkbox-group>
                </el-collapse-item>
              </el-collapse>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewItem = false">取 消</el-button>
        <el-button type="primary" @click="newItem('part')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { list } from "@/api/user";
import Pagination from "@/components/Pagination";
import { asyncRoutes } from "@/router";
export default {
  name: "InlineEditTable",
  components: { Pagination },
  data() {
    return {
      part: {
        name: "",
      },
      user: {
        nickname: "",
        username: "",
        password: "",
        avatar: "",
        roles: [],
        status: 1,
      },
      permissions: [[]],
      table: [],
      page: 1,
      pageSize: 10,
      search: "",
      counts: 0,
      listLoading: false,
      showNewItem: true,
      rules: {
        name: [{ required: true, message: "请输入部件名称", trigger: "blur" }],
      },
    };
  },
  async created() {
    this.getData();
    // 循环异步路由获取权限列表
    console.log(asyncRoutes);
    asyncRoutes.forEach((item, index) => {
      if (item.meta) {
        this.permissions[index] = {
          title: item.meta.title,
          role: item.meta.role,
          children: [],
        };
        let children = [];
        item.children.forEach((child) => {
          children.push({
            title: child.meta.title,
            role: child.meta.role,
          });
        });
        this.permissions[index].children = children;
      }
    });
  },
  methods: {
    /**
     * @description: 表单校验提交创建
     * @param {String} formName 表单名称
     */
    newItem(formName) {
      this.showNewItem = false;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await create(this.part.name);
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.getData();
        } else {
          return false;
        }
      });
    },
    /**
     * @description: 删除一行数据
     * @param {*} row
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
    async getData() {
      this.listLoading = true;
      const res = await list(this.page, this.pageSize, this.search);
      this.table = res.data;
      this.counts = res.counts;
      this.listLoading = false;
    },
    confirmEdit(row) {
      row.edit = false;
      row.tempName = row.name;
      this.$message({
        message: "编辑成功",
        type: "success",
      });
    },

    /**
     * @description: 权限列表变更,仅仅是子权限添加到权限列表肯定不行,
     * 哪怕只有一个子元素被选入也需要将改母节点放入,相反,如果一个子节点都没有就需要删除该母节点
     * @param {Object} parent 操作的母节点
     */
    roleChange(parent) {
      console.log(parent);
      let parentChild = [];
      // 将操作的母节点的子元素role全部取出
      parent.children.forEach((item) => {
        parentChild.push(item.role);
      });
      // 两个数组进行对比
      let flag = false; // 是否存在相同元素的标志
      parentChild.forEach((item) => {
        if (this.user.roles.includes(item)) {
          flag = true;
        }
      });
      if (flag) {
        if (!this.user.roles.includes(parent.role)) {
          this.user.roles.push(parent.role);
        }
      } else {
        if (this.user.roles.includes(parent.role)) {
          this.user.roles.splice(this.user.roles.indexOf(parent.role), 1);
        }
      }
    },
    createUser() {},
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
.upload-button{
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 2px dashed #666;
  position: relative;
  cursor: pointer;
}
.upload-plus{
  font-size: 40px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}
.upload-name{
  font-size: 10px;
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 2px;
  left: 50%;
  width: 100%;
  text-align: center;
}
</style>
