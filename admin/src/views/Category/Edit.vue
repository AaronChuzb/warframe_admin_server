<!--
 * @Date: 2021-08-26 11:26:48
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 13:20:29
-->
<template>
  <div>
    <h1>新建分类</h1>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="分类名称">
              <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级分类">
              <el-select v-model="form.parent" filterable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in parentList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">{{ this.id?'保存':'新增' }}数据</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String },
  },
  data() {
    return {
      parentList: [{ name: '', _id: undefined }],
      form: {
        name: "",
        parent: undefined,
      },
    };
  },
  async mounted() {
    const res = await this.$api.getCategorys(1, 999, [], "");
    this.parentList = this.parentList.concat(res.data.data);
    this.id && this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getCategory(this.id);
      this.form = res.data;
    },
    async onSubmit() {
      console.log("提交");
      console.log(this.form);
      if (this.id) {
        await this.$api.updateCategory(this.id, this.form);
        this.$message({
          type: "success",
          message: "编辑成功",
        });
      } else {
        await this.$api.createCategory(this.form);
        this.$message({
          type: "success",
          message: "创建成功",
        });
      }
      this.$router.push("/category/list");
    },
  },
};
</script>

<style></style>
