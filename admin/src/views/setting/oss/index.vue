<!--
 * @Date: 2021-09-01 22:34:40
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-12 19:25:22
-->
<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>配置详细</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="isEdit = !isEdit">{{ isEdit ? "保存" : "编辑" }}</el-button>
      </div>
      <div>
        <el-form ref="form" :model="oss" label-width="130px">
          <el-form-item label="region:">
            <el-input :disabled="!isEdit" v-model="oss.region"></el-input>
          </el-form-item>
          <el-form-item label="bucket:">
            <el-input :disabled="!isEdit" v-model="oss.bucket"></el-input>
          </el-form-item>
          <el-form-item label="accessKeyId:">
            <el-input :disabled="!isEdit" v-model="oss.accessKeyId"></el-input>
          </el-form-item>
          <el-form-item label="accessKeySecret:">
            <el-input :disabled="!isEdit" type="password" v-model="oss.accessKeySecret"></el-input>
          </el-form-item>
        </el-form>
        <div></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      isEdit: false,
      oss: {
        region: "",
        bucket: "",
        accessKeyId: "",
        accessKeySecret: "",
      },
    };
  },
  async created() {
    await store.dispatch("oss/getOss");
    this.oss = { ...store.getters.getOss.oss };
  },
};
</script>

<style></style>
