<!--
 * @Date: 2021-09-28 15:33:56
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 17:05:03
-->
<template>
  <el-dialog title="设置新的联系方式" :visible.sync="show" :before-close="cancle">
    <el-form :model="form" :rules="rules" status-icon ref="form">
      <el-form-item label="QQ、微信、电话或者邮箱" prop="contact">
        <el-input v-model="form.contact" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeMyContact } from '@/api/user'
export default {
  props: {
    show: false,
  },
  data() {
    return {
      form: {
        contact: '',
      },
      rules: {
        contact: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
      },
    }
  },
  methods: {
    cancle() {
      this.form = {
        contact: '',
      }
      this.$emit('cancle')
    },
    async save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await changeMyContact(this.form.contact)
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
