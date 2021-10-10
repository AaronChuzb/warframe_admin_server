<!--
 * @Date: 2021-10-09 15:10:32
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-10 17:26:40
-->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="itemData.img" class="image" />
    <div style="padding: 6px; font-size: 12px">
      <div>{{ itemData.name }}</div>
      <div style="display: flex">{{ itemData.price }}<el-image style="width: 12px; height: 12px" :src="require('@/assets/gj.png')" fit="fill"></el-image></div>
      <div class="bottom clearfix">
        <el-button type="text" class="button" @click="edit(itemData._id)">编辑</el-button>
        <el-button type="text" class="button danger" @click="deleteItem(itemData._id, itemData.name)">删除</el-button>
      </div>
    </div>
  </el-card>
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
  methods: {
    edit(id) {
      this.$emit('edit', id)
    },
    deleteItem(id, name) {
      this.$emit('deleted', id, name)
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  width: 100%;
}
.image {
  width: 100%;
  // min-height: 200px;
  display: block;
  background: #273337;
}
.price-box {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 999;
  .price {
  }
}
.danger {
  color: #f56c6c;
  margin-right: 10px;
}
</style>
