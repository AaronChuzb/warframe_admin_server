<!--
 * @Date: 2021-08-26 11:26:48
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-27 17:33:18
-->
<template>
  <div>
    <h1>{{ id ? "编辑遗物" : "新建遗物" }}</h1>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="遗物名称">
              <el-input v-model="form.name" placeholder="请输入遗物名称，例如E1" @change="nameFormat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="遗物分类">
              <el-select v-model="form.parent" filterable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in remainTypeList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="铜一档">
              <el-select v-model="form.cu1" filterable remote reserve-keyword placeholder="请选择铜一档部件" :remote-method="searchPart" :loading="loading">
                <el-option v-for="item in partList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="铜二档">
              <el-select v-model="form.cu2" filterable remote reserve-keyword placeholder="请选择铜二档部件" :remote-method="searchPart" :loading="loading">
                <el-option v-for="item in partList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="铜三档">
              <el-select v-model="form.cu3" filterable remote reserve-keyword placeholder="请选择铜三档部件" :remote-method="searchPart" :loading="loading">
                <el-option v-for="item in partList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="银一档">
              <el-select v-model="form.ag1" filterable remote reserve-keyword placeholder="请选择银一档部件" :remote-method="searchPart" :loading="loading">
                <el-option v-for="item in partList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银二档">
              <el-select v-model="form.ag2" filterable remote reserve-keyword placeholder="请选择银二档部件" :remote-method="searchPart" :loading="loading">
                <el-option v-for="item in partList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="金档">
              <el-select v-model="form.au" filterable remote reserve-keyword placeholder="请选择金档部件" :remote-method="searchPart" :loading="loading">
                <el-option v-for="item in partList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="获取遗物的方式">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="form.getways"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">{{ id ? "保存" : "新增" }}数据</el-button>
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
      loading: false,
      remainTypeList: [],
      partList: [],
      form: {
        name: "",
        type: "",
        cu1: "",
        cu2: "",
        cu3: "",
        ag1: "",
        ag2: "",
        au: "",
        getways: "",
      },
    };
  },
  async created() {
    const res = await this.$api.getRemainsType();
    this.remainTypeList = res.data.data;
  },
  async mounted() {
    this.id && this.getData();
  },
  methods: {
    // 遗物名称格式化
    nameFormat() {
      const reg = /[\u4e00-\u9fa5]/g;
      this.form.name = this.form.name.replace(/[ ]/g, ""); //去空格
      this.form.name = this.form.name.replace(reg, ""); //去除中文
      this.form.name = this.form.name.toUpperCase();
    },
    // 根据关键词获取数据库中部件
    async searchPart(name) {
      this.loading = true;
      if(name){
        const res = await this.$api.getParts(1, 5, ["name"], name);
        this.loading = false
        this.partList = res.data.data;
      }
    },
    async getData() {
      const res = await this.$api.getRemain(this.id);
      this.form = res.data;
    },
    async onSubmit() {
      console.log("提交");
      console.log(this.form);
      if (this.id) {
        await this.$api.updateRemain(this.id, this.form);
        this.$message({
          type: "success",
          message: "编辑成功",
        });
        this.$router.push("/part/list");
      } else {
        await this.$api.createRemain(this.form);
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.form.name = "";
      }
    },
  },
};
</script>

<style>
.el-select{
  width: 100%;
}
</style>
