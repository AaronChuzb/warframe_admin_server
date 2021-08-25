<!--
 * @Date: 2021-08-20 22:38:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-25 16:50:19
-->
<template>
  <div class="page">
    <div class="form">
      <h1>{{ id ? "编辑类型" : "新增类型" }}</h1>
      <el-tabs type="border-card" v-model="tabName">
        <el-tab-pane :label="item.label" :name="item.value" v-for="(item, index) in tabs" :key="index">
          <el-form :ref="item.value" :model="item.obj" label-width="100px" label-position="top" :rules="rules">
            <el-form-item :label="item.label + '类型名'" prop="name">
              <el-input v-model="item.obj.name"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="text-align: right">
                <el-button type="primary" @click="onSubmit(index, item.value)">提交数据</el-button>
                <el-button>取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String },
    id: { type: String },
  },
  data() {
    return {
      tabName: "warframe_types",
      tabs: [
        { label: "战甲", value: "warframe_types", obj: { name: "" } },
        { label: "武器", value: "weapon_types", obj: { name: "" } },
        { label: "遗物", value: "remain_types", obj: { name: "" } },
        { label: "同伴", value: "friend_types", obj: { name: "" } },
        { label: "Mod", value: "mod_types", obj: { name: "" } },
        { label: "遗物部件", value: "prime_part_types", obj: { name: "" } },
        { label: "普通部件", value: "part_types", obj: { name: "" } },
      ],
      rules: {
        name: [{ required: true, message: "就一个框你都不填？", trigger: "blur" }],
      },
    };
  },
  mounted() {
    if (this.id) {
      let temp = [];
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.type == this.tabs[i].value) {
          temp.push(this.tabs[i]);
          break;
        }
      }
      this.tabs = temp;
      this.getData();
    }
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`rest/${this.type}/${this.id}`);
      this.tabs[0].obj = res.data;
    },
    async onSubmit(index, formName) {
      this.$refs[formName][0].validate( async (valid)=>{
        if(valid){
          if (this.id) {
            await this.$http.put(`rest/${this.type}/${this.id}`, this.tabs[0].obj);
            this.$message({
              type: "success",
              message: "编辑成功",
            })
            this.$router.push('/type/list')
          } else {
            await this.$http.post(`rest/${this.tabName}`, this.tabs[index].obj);
            this.$message({
              type: "success",
              message: "创建成功",
            })
            this.tabs[index].obj.name = ''
          }
        }
      })
      
    },
  },
};
</script>

<style lang="less">
.page {
  background: #f2f2f2;
  width: 100%;
}
</style>
