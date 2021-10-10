<!--
 * @Date: 2021-10-09 14:59:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-10 17:46:57
-->
<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <h3>常驻奖励</h3>
          <el-row :gutter="10">
            <el-col :md="6" :sm="8" v-for="item in fixedList" :key="item._id" style="margin-bottom: 10px">
              <Item :item-data="item" @edit="editItem" @deleted="deleteItem"></Item>
            </el-col>
            <el-col :md="6" :sm="8" style="margin-bottom: 10px">
              <Edit ref="edit" @done="getData"></Edit>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :xs="24">
          <h3>轮换奖励</h3>
          <el-row :gutter="10">
            <el-col :md="6" :sm="8" v-for="item in rotationList" :key="item._id" style="margin-bottom: 10px">
              <Item :item-data="item" @edit="editItem" @deleted="deleteItem"></Item>
            </el-col>
            <el-col :md="6" :sm="8" style="margin-bottom: 10px">
              <Edit ref="edit" @done="getData"></Edit>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { list, deleted } from "@/api/rotation";
import Item from './components/item.vue'
import Edit from './components/edit.vue'
export default {
  name: "rotation",
  components: { Item, Edit },
  data() {
    return {
      fixedList: [],
      rotationList: [],
      rotationCounts: 0
    };
  },
  async created() {
    this.getData();
      // 获取下周一的时间戳
      let today = new Date();
      //设置时间为早上08:00:00
      today.setHours(8, 0, 0, 0);
      //获得今天与下星期一相隔几天
      let days = 7 - (today.getDay() ? today.getDay() : 7) + 1;
      //今天早上08:00:00的时间戳 加上今天与下周一的日差秒数得到结果时间戳
      let result = today.getTime() + days * 86400000 ;
      console.log(result)
  },
  methods: {
    /**
     * @description: 获取页面数据
     */
    async getData() {
      const res = await list()
      this.fixedList = res.fixedList
      this.rotationList = res.rotationList
      this.rotationCounts = res.rotationCounts
    },
    editItem(id){
      this.$refs.edit.getInfoAndEdit(id)
    },
    deleteItem(id, name){
      this.$confirm(`确定删除“${name}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleted(id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getData();
      });
    }
    
  },
};
</script>

<style lang="scss" scoped>

</style>
