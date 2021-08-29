<!--
 * @Date: 2021-08-26 11:26:48
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-29 15:12:30
-->
<template>
  <div>
    <h1>{{ id ? "编辑战甲" : "新建战甲" }}</h1>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="form" label-width="100px" label-position="top">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="战甲名称">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
              </el-form-item>
              <el-form-item label="战甲分类">
                <el-select v-model="form.type" filterable placeholder="请选择" style="width: 100%" @change="chooseType">
                  <el-option v-for="item in warframeTypeList" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="6">
              <el-form-item label="战甲列表图">
                <el-upload class="img-uploader" :class="[form.img !== '' ? 'disabled' : '']" action="" list-type="picture-card" :http-request="uploader" :file-list="file_list" :limit="1" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="血量">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="能量">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="护盾">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="护甲">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="段位要求">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="冲刺速度">
                <el-input v-model="form.name" placeholder="请输入战甲名称"></el-input>
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
      </el-tab-pane>
      <el-tab-pane label="技能列表">配置管理</el-tab-pane>
      <el-tab-pane label="部件列表">角色管理</el-tab-pane>
      <el-tab-pane label="详细信息&攻略">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import uploader from "../../plugins/oss";
export default {
  props: {
    id: { type: String },
  },
  data() {
    return {
      loading: false,
      warframeTypeList: [],
      partList: [],
      file_list: [],
      tempType: "",
      form: {
        name: "",
        type: "",
        img: "",
      },
      tempForm: {
        name: "",
        type: "",
        img: "",
      },
    };
  },
  async created() {
    const res = await this.$api.getWarframesType();
    this.warframeTypeList = res.data.data;
  },
  async mounted() {
    this.id && this.getData();
  },
  methods: {
    // 数据回显
    async getData() {
      // const res = await this.$api.getRemain(this.id, 'remain');
    },
    async uploader(e) {
      const img = await uploader(e.file);
      this.form.img = img;
    },
    handleRemove() {
      this.form.img = "";
      this.file_list = [];
    },
    async onSubmit() {
      if (this.id) {
        await this.$api.updateRemain(this.id, this.form);
        this.$message({
          type: "success",
          message: "编辑成功",
        });
        this.$router.push("/remain/list");
      } else {
        await this.$api.createRemain(this.form);
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.form = this.tempForm;
      }
    },
  },
};
</script>

<style>
.el-select {
  width: 100%;
}

.disabled .el-upload--picture-card {
  display: none;
}
</style>
