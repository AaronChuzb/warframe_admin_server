<!--
 * @Date: 2021-09-28 16:00:42
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 17:09:53
-->
<template>
  <el-dialog title="设置新的游戏内ID" :visible.sync="show" :before-close="cancle">
    <el-form :model="form" :rules="rules" status-icon ref="form">
      <el-form-item label="" prop="game_id">
        <el-input v-model="form.game_id" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeMyGameId } from '@/api/user'
export default {
  props: {
    show: false,
  },
  data() {
    return {
      form: {
        game_id: '',
      },
      rules: {
        game_id: [{ required: true, message: '请输入游戏内ID', trigger: 'blur' }],
      },
    }
  },
  methods: {
    cancle() {
      this.form = {
        game_id: '',
      }
      this.$emit('cancle')
    },
    async save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await changeMyGameId(this.form.game_id)
          this.$message({
            type: res.type,
            message: res.message,
          })
          this.cancle()
          await this.$store.dispatch('user/userInfo')
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style></style>
