<!--
 * @Date: 2021-08-20 21:01:12
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 18:19:49
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
   console.log(res.data.data[0])
   this.$store.commit('updataOss', res.data.data[0])
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
