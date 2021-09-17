<!--
 * @Date: 2021-09-16 16:07:01
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-17 18:33:41
-->
<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row :gutter="20" v-for="(item, index) in layout" :key="index">
      <el-col  style="margin-bottom: 20px;" :xs="child.xs" :sm="child.sm" :md="child.md" :lg="child.lg" :xl="child.xl" :span="child.span" v-for="(child, idx) in item" :key="child.title + idx">
        <el-card >
          <div v-if="idx == 0" class="user-info">
            <div class="avatar">
              <el-avatar :src="$store.getters.avatar" :size="100" fit="fill"></el-avatar>
              <div class="change-img">更换头像</div>
            </div>
          </div>
          <div v-if="idx == 1" style="height: 300px">
            
          </div>
          <!-- 图表 -->
          <div v-if="idx == 2" style="height: 300px">
            <div id="total" style="width: 100%;height: 100%;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
import { total } from '@/api/index'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      layout: [
        [
          { span: 7, title: '用户', xs: 12, sm: 12, md: 12, lg: 6, xl: 7 },
          { span: 7, title: '测试2', xs: 12, sm: 12, md: 12, lg: 6, xl: 7 },
          { span: 10, title: '词条统计', xs: 24, sm: 24, md: 24, lg: 12, xl: 10 },
        ],
      ],
      option: {
        title: {
          text: '词条数量统计',
          subtext: '数据来自接口统计',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.1],
        },
        yAxis: {
          type: 'category',
          data: ['分类', '遗物部件', '遗物'],
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [24, 328, 2],
          },
        ],
        dataZoom: {
          show: true, // 为true 滚动条出现
          realtime: true,
          type: 'inside', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
          height: 10, // 表示滚动条的高度，也就是粗细
          start: 0, // 表示默认展示20%～80%这一段。
          end: 100,
        },
      },
    }
  },
  created() {
  },
  methods: {
    async initChart() {
      const res = await total()
      console.log(res)
      let keys = ['category', 'part', 'remain']
      keys.forEach((item, index)=>{
        this.option.series[0].data[index] = res[item]
      })
      echarts.init(document.getElementById('total')).setOption(this.option)
    },
  },
  mounted() {
    this.initChart()
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
.user-info {
  height: 300px;
  .avatar {
    margin: 0 auto;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
    text-align: center;
  }
  .change-img {
    cursor: pointer;
    position: absolute;
    bottom: 0px;
    font-size: 12px;
    color: #fff;
    transform: translate(-50%);
    left: 50%;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: rgba($color: #000000, $alpha: 0.5);
    opacity: 0;
  }
  .change-img:hover{
    opacity: 1;
  }
}
</style>
