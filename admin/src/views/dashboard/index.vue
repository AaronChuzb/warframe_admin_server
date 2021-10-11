<!--
 * @Date: 2021-09-16 16:07:01
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 15:25:45
-->
<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row :gutter="20" v-for="(item, index) in layout" :key="index">
      <el-col style="margin-bottom: 20px;" :xs="child.xs" :sm="child.sm" :md="child.md" :lg="child.lg" :xl="child.xl" :span="child.span" v-for="(child, idx) in item" :key="child.title + idx">
        <el-card>
          <!-- 图表 -->
          <div v-if="child.title === '词条统计'" style="height: 300px">
            <div id="total" style="width: 100%;height: 100%;"></div>
          </div>
          <div v-if="child.title === '访问统计'" style="height: 300px">
            <h3>{{ child.title }}</h3>
            <el-empty></el-empty>
          </div>
          <div v-if="child.title === '最新用户反馈'" style="height: 300px;">
            <h3>{{ child.title }}</h3>
            <div class="suggest-list" style="height: 250px;overflow: auto;margin-top:20px">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="suggest in suggestList" :key="suggest._id" :title="suggest.type" :name="suggest._id">
                  <div>{{ suggest.text }}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <el-empty v-if="suggestList.length == 0"></el-empty>
          </div>
          <div v-if="child.title === '留言区'" style="height: 300px">
            <h3>{{ child.title }}</h3>
            <el-empty></el-empty>
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
      activeName: '',
      layout: [
        [
          { span: 10, title: '词条统计', xs: 24, sm: 24, md: 24, lg: 12, xl: 10 },
          { span: 7, title: '最新用户反馈', xs: 24, sm: 12, md: 12, lg: 6, xl: 7, data: [] },
          { span: 7, title: '访问统计', xs: 24, sm: 12, md: 12, lg: 6, xl: 7 },
        ],
        [{ span: 10, title: '留言区', xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }],
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
      date: new Date(),
      suggestList: [],
    }
  },
  created() {},
  methods: {
    async initChart() {
      const res = await total()
      this.suggestList = res.suggest
      this.activeName = res.suggest[0]._id
      let keys = ['category', 'part', 'remain']
      keys.forEach((item, index) => {
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
  .change-img:hover {
    opacity: 1;
  }
}
h3 {
  margin: 0;
  line-height: 1;
}
.suggest-list::-webkit-scrollbar {
  width: 0;
}
</style>
