<!--
 * @Date: 2021-08-26 11:26:48
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-26 15:30:47
-->
<template>
  <div>
    <h1>{{ id?'编辑部件':'新建部件' }}</h1>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="部件名称">
              <el-input v-model="form.name" placeholder="请输入部件名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">{{ id?'保存':'新增' }}数据</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
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
      form: {
        name: ""
      },
    };
  },
  async mounted() {
    this.id && this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getPart(this.id);
      this.form = res.data;
    },
    async onSubmit() {
      console.log("提交");
      console.log(this.form);
      if (this.id) {
        await this.$api.updatePart(this.id, this.form);
        this.$message({
          type: "success",
          message: "编辑成功",
        });
        this.$router.push("/part/list");
      } else {
        await this.$api.createPart(this.form);
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.form.name = ''
      }
    },
  },
};
</script>

<style></style>
