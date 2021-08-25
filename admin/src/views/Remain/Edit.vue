<!--
 * @Date: 2021-08-20 22:38:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 18:38:38
-->
<template>
  <div class="page">
    <div class="form">
      <h1>{{ id ? "编辑遗物" : "新增遗物" }}</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="遗物名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="遗物类型">
                <el-select v-model="form.type" placeholder="请选择遗物类型">
                  <el-option :label="item.name" :value="item._id" v-for="item in types" :key="item._id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="铜一档">
                <el-autocomplete class="inline-input" v-model="form.cu[0].name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect">
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="铜二档">
                <el-autocomplete class="inline-input" v-model="form.cu[1].name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect">
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="铜三档">
                <el-autocomplete class="inline-input" v-model="form.cu[2].name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银一档">
                <el-autocomplete class="inline-input" v-model="form.ag[0].name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银二档">
                <el-autocomplete class="inline-input" v-model="form.ag[1].name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金档">
                <el-autocomplete class="inline-input" v-model="form.au[0].name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">提交数据</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
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
      types: [],
      file_list: [],
      form: {
        name: "", // 遗物名称
        type: "", // 遗物类型
        img: "", // 图片列表
        cu: [
          { name: '' },
          { name: '' },
          { name: '' },
        ],
        ag: [
          { name: '' },
          { name: '' },
        ],
        au: [
          { name: '' },
          { name: '' },
        ],
        gets: [
          { name: '' },

        ],
      },
      num: 0,
    };
  },
  async mounted() {
    const res = await this.$api.getType("remain_types", 1, 999, [], "");
    this.types = res.data.data;
    this.id && this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get("rest/remains/" + this.id);
      this.form = res.data;
    },
    async querySearch(queryString, cb) {
      var res = await this.$api.getPrimePart(1, 8, ["name"], queryString);
      let results = res.data.data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
      this.form.cu[0] = item
    },
    async onSubmit() {
      if (this.id) {
        await this.$http.put("rest/remains/" + this.id, this.form);
        this.$message({
          type: "success",
          message: "编辑成功",
        });
      } else {
        await this.$http.post("rest/remains", this.form);
        this.$message({
          type: "success",
          message: "创建成功",
        });
      }
      this.$router.push("/remain/list");
    },
    async uploader(e) {
      console.log(e);
      const url = await uploader(e.file);
      this.form.img.push(url);
    },
  },
};
</script>

<style lang="less">
.page {
  background: #f2f2f2;
  width: 100%;
  .form {
    .item {
      padding: 2vw;
      background: #fff;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
      margin-bottom: 2vw;
      .title {
        font-weight: bold !important;
      }
    }
  }
}
.disabled .el-upload--picture-card {
  display: none;
}
</style>
