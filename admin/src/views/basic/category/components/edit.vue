<!--
 * @Date: 2021-09-13 14:58:33
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-17 14:51:25
-->
<template>
  <el-dialog :title="isEdit?'编辑分类':'新增分类'" :visible.sync="show" @close="cancle" :before-close="cancle">
    <el-form :model="category" :rules="rules" ref="category" :inline="true">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="category.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级分类" prop="parent">
        <el-select v-model="category.parent" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
          <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
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
      id: '',
      category: {
        name: "",
        parent: null,
      },
      isEdit: false,
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
      loading: false,
      options: []
    };
  },
  methods: {
    async getInfoAndEdit(id){
      this.id = id
      this.isEdit = true
      const res = await getInfo(id)
      console.log(res)
      let data = JSON.parse(JSON.stringify(res))
      if(res.parent != null){
        this.options = [data.parent]
        res.parent = res.parent._id
      }
      this.category = res
      
    },
    restForm(){
      this.isEdit = false
      this.id = ""
      this.category = {
        name: "",
        parent: null,
      },
      this.options = []
    },
    /**
     * @description: 关闭表单
     */
    cancle() {
      this.restForm()
      this.$emit("cancle");
    },
    /**
     * @description: 选择框远端搜索
     * @param {String} e 关键词
     */
    async searchInput(e){
      if(e == "") return
      this.loading = true
      const res = await search(e)
      this.options = res
      this.options.splice(1, 0)
      this.loading = false
    },
    /**
     * @description: 新建分类
     * @param {*} formName 表单名称
     */
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(!this.isEdit){ // 新建
            await create(this.category);
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          } else { // 编辑
            await change(this.id, this.category)
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
          }
          this.restForm()
          this.$emit('done');
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style></style>
