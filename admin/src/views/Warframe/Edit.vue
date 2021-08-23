<!--
 * @Date: 2021-08-23 13:38:23
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 18:03:29
-->
<template>
  <v-app>
    <v-btn @click="test" elevation="2">弹窗</v-btn>
  </v-app>
</template>

<script>
export default {
  methods: {
    test() {
      this.$message.success("测试");
    },
  },
};
</script>

<style></style>
