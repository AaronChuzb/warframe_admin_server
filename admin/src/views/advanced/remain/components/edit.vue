<!--
 * @Date: 2021-09-13 17:24:27
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-13 18:27:14
-->
<template>
  <el-dialog :title="isEdit ? '编辑遗物' : '新增遗物'" :visible.sync="show" @close="cancle" :before-close="cancle" fullscreen>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <div slot="header">记录板</div>
          <div>
            <el-input type="textarea" :autosize="{ minRows: 10 }" placeholder="请输入内容" v-model="textarea2"> </el-input>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14" :offset="2">
        <el-form :model="category" :rules="rules" ref="category" label-position="top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="遗物名称" prop="name">
                <el-input v-model="category.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="遗物分类" prop="parent">
                <el-select style="width: 100%" v-model="category.parent" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
                  <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="铜一档" prop="parent">
                <el-select style="width: 100%" v-model="category.parent" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
                  <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="铜二档" prop="parent">
                <el-select style="width: 100%" v-model="category.parent" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
                  <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="铜三档" prop="parent">
                <el-select style="width: 100%" v-model="category.parent" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
                  <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('category')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create, search, getInfo, change } from "@/api/category";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      id: "",
      category: {
        name: "",
        parent: "",
      },
      isEdit: false,
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
      loading: false,
      options: [],
    };
  },
  methods: {
    async getInfoAndEdit(id) {
      this.id = id;
      this.isEdit = true;
      const res = await getInfo(id);
      console.log(res);
      let data = JSON.parse(JSON.stringify(res));
      if (res.parent != null) {
        this.options = [data.parent];
        res.parent = res.parent._id;
      }
      this.category = res;
    },
    restForm() {
      this.isEdit = false;
      this.id = "";
      (this.category = {
        name: "",
        parent: "",
      }),
        (this.options = []);
    },
    /**
     * @description: 关闭表单
     */
    cancle() {
      this.restForm();
      this.$emit("cancle");
    },
    /**
     * @description: 选择框远端搜索
     * @param {String} e 关键词
     */
    async searchInput(e) {
      if (e == "") return;
      this.loading = true;
      const res = await search(e);
      this.options = res;
      this.options.splice(1, 0);
      this.loading = false;
    },
    /**
     * @description: 新建分类
     * @param {*} formName 表单名称
     */
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            // 新建
            await create(this.category);
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          } else {
            // 编辑
            await change(this.id, this.category);
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
          }
          this.restForm();
          this.$emit("done");
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style></style>
