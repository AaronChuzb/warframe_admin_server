<!--
 * @Date: 2021-09-27 17:31:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-27 17:41:10
-->
<template>
  <div class="title">
    <div class="border"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #999;
  .border{
    width: 5px;
    height: 22px;
    border-radius: 2px;
    background: #999;
    margin-right: 5px;
  }
}
</style>