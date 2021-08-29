<!--
 * @Date: 2021-08-24 16:21:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-28 23:46:20
-->
<template>
  <div class="page">
    <div style="height: 2vw"></div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="item">
            <img src="../assets/remain.png">
            <div>
              <div>遗物数量</div>
              <div class="num">{{table.remains}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="item">
            <img src="../assets/part.png">
            <div>
              <div>部件数量</div>
              <div class="num">{{table.parts}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="item">
            <img src="../assets/warframe.png" style="width: 50px">
            <div>
              <div>战甲数量</div>
              <div class="num">{{table.parts}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">昨日用户访问量</div>
          <div></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      table: {
        remains: 0,
        parts: 0
      }
    }
  },
  async created(){
    const res = await this.$api.getTotal()
    console.log(res)
    this.table = res.data
  }
};
</script>

<style lang="less" scpoed>
  .item{
    display: flex;
    justify-content: space-between;
    line-height: 18px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    font-weight: bold;
    text-align: right;
    align-items: center;
    img{
      width: 80px;
      height: 51px;
    }
    .num{
      margin-top: 18px;
    }
  }
</style>
