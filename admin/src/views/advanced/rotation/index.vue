<!--
 * @Date: 2021-10-09 14:59:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-12 10:22:51
-->
<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <h3>常驻奖励</h3>
          <el-row :gutter="10">
            <el-col :md="6" :sm="8" :xs="12" v-for="item in fixedList" :key="item._id" style="margin-bottom: 10px">
              <Item :item-data="item" @edit="editItem" @deleted="deleteItem"></Item>
            </el-col>
            <el-col :md="6" :sm="8" :xs="12" style="margin-bottom: 10px">
              <Edit ref="edit" @done="getData"></Edit>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :xs="24">
          <h3>轮换奖励</h3>
          <el-row :gutter="10">
            <el-col :md="6" :sm="8" :xs="12" v-for="item in rotationList" :key="item._id" style="margin-bottom: 10px">
              <Item :item-data="item" @edit="editItem" @deleted="deleteItem"></Item>
            </el-col>
            <el-col :md="6" :sm="8" :xs="12" style="margin-bottom: 10px">
              <EditRotation :rank-counts="rotationCounts + 1" ref="edit_rotation" @done="getData"></EditRotation>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { list, deleted } from '@/api/rotation'
import Item from './components/item.vue'
import Edit from './components/edit.vue'
import EditRotation from './components/edit_rotation.vue'
export default {
  name: 'rotation',
  components: { Item, Edit, EditRotation },
  data() {
    return {
      fixedList: [],
      rotationList: [],
      rotationCounts: 0,
    }
  },
  async created() {
    this.getData()
  },
  methods: {
    /**
     * @description: 获取页面数据
     */
    async getData() {
      const res = await list()
      this.fixedList = res.fixedList
      this.rotationList = res.rotationList
      this.rotationCounts = res.rotationCounts
    },
    editItem(id, type) {
      console.log(type)
      if (!type) {
        this.$refs.edit.getInfoAndEdit(id)
      } else {
        this.$refs.edit_rotation.getInfoAndEdit(id)
      }
    },
    deleteItem(id, name) {
      this.$confirm(`确定删除“${name}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleted(id)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.getData()
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
