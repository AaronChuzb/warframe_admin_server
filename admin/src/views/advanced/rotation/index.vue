<!--
 * @Date: 2021-10-09 14:59:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-09 18:04:50
-->
<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="12" :xs="24">
          <h3>常驻奖励</h3>
          <el-row :gutter="10">
            <el-col :span="8" :sm="8" v-for="item in 9" :key="item" style="margin-bottom: 10px">
              <Item></Item>
            </el-col>
            <el-col :span="8" :sm="8" style="margin-bottom: 10px">
              <Edit></Edit>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :xs="24">
          <h3>轮换奖励</h3>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { list, deleted, getType } from "@/api/remain";
import Item from './components/item.vue'
import Edit from './components/edit.vue'
export default {
  name: "rotation",
  components: { Item, Edit },
  data() {
    return {
      table: [],
      
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
      
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
