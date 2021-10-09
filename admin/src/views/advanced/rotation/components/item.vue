<!--
 * @Date: 2021-10-09 15:10:32
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-09 15:38:02
-->
<template>
  <div class="item">
    <div class="price-box">
      <el-image style="width: 18px; height: 18px" :src="require('@/assets/gj.png')" fit="cover"></el-image>
      <div class="price">{{ itemData.price }}</div>
    </div>
    <el-image style="width: 100%; height: 100%" :src="itemData.img" fit="fill"></el-image>
    <view class="name">{{ itemData.name }}</view>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          img: '',
          name: '名称',
          price: '0',
        }
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  width: 100%;
}
.price-box {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 999;
  .price {
  }
}
</style>
