<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods:{
    message(){
      this.$message.error('错误')
    }
  }
};
</script>
