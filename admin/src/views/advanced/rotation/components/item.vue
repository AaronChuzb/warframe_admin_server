<!--
 * @Date: 2021-10-09 15:10:32
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-11 15:00:10
-->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="itemData.img" class="image" />
    <div style="padding: 6px; font-size: 12px">
      <div class="name">{{ itemData.name }}</div>
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
      let type
      this.itemData.is_rotation?(type = true):(type = false)
      this.$emit('edit', id, type)
    },
    deleteItem(id, name) {
      this.$emit('deleted', id, name)
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  display: block;
  background: #273337;
}
.name{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.danger {
  color: #f56c6c;
  margin-right: 10px;
}
</style>
