<!--
 * @Date: 2021-09-16 18:19:18
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-16 18:19:18
-->
<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>