<!--
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 17:59:03
-->
<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
  async created(){
    // 请求秘钥信息
   const res = await this.$http.get('rest/osses')
   console.log(res)
  }
}
</script>

<style>
 html, body{
   margin: 0;
   padding: 0;
   background: #f2f2f2;
 }
</style>
