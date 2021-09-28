<!--
 * @Date: 2021-09-28 13:36:52
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:18:11
-->
<template>
  <el-dialog title="修改密码" :visible.sync="show" :before-close="cancle">
    <el-form :model="form" :rules="rules" status-icon ref="form">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="tempPassword">
        <el-input type="password" v-model="form.tempPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeMyPass } from '@/api/user'
export default {
  props: {
    show: false,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.form.password !== '') {
          this.$refs.form.validateField('password')
        }
        callback()
      }
    }
    const validateTempPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {

      form: {
        oldPassword: '',
        password: '',
        tempPassword: '',
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        tempPassword: [{ validator: validateTempPass, trigger: 'blur' }],
      },
    }
  },
  methods: {
    cancle() {
      this.form = {
        oldPassword: '',
        password: '',
        tempPassword: '',
      }
      this.$emit('cancle')
    },
    async save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await changeMyPass(this.form.oldPassword, this.form.password)
          this.$message({
            type: res.type,
            message: res.message,
          })
          this.cancle()
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style></style>
