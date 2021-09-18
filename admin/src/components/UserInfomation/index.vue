<!--
 * @Date: 2021-09-18 14:15:34
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-18 15:13:01
-->
<template>
  <el-dialog title="个人资料" :visible.sync="show" :append-to-body="true">
    <el-form :model="user" :rules="rules" ref="user">
      <el-row :gutter="20">
        <el-col :span="12" class="avatar">
          <el-upload v-if="user.avatar == ''" action="https" :auto-upload="true" :http-request="uploadAvatar" :show-file-list="false" :limit="1">
            <div class="upload-button">
              <div class="upload-plus">+</div>
            </div>
          </el-upload>
          <el-avatar v-else shape="square" :size="80" fit="fill" :src="user.avatar"></el-avatar>
          <el-button @click="user.avatar = ''">更换头像</el-button>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="user.nickname" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="账户" prop="username">
            <el-input v-model="user.username" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="游戏ID">
            <el-input v-model="user.game_id" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input v-model="user.contact" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">编 辑</el-button>
      <el-button type="primary" @click="show = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserInfomation',
  data() {
    return {
      show: false,
      user: { // 用户的表单
        nickname: "",
        username: "",
        password: "",
        avatar: "",
        game_id: "",
        contact: ""
      },
      rules: { // 表单校验规则
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        username: [{ required: true, message: "请输入账户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roles: [{ required: true, message: "请选择用户权限", trigger: "blur" }],
      },
    }
  },
  mounted() {},
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    /**
     * @description: 头像上传
     * @param {Object} e 上传的图片文件
     */
    async uploadAvatar(e) {
      const res = await this.$uploader(e.file);
      this.user.avatar = res;
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-button {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 2px dashed #666;
  position: relative;
  cursor: pointer;
}
.upload-plus {
  font-size: 40px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
}
.upload-name {
  font-size: 10px;
  position: absolute;
  transform: translate(-50%, -50%);
  bottom: 2px;
  left: 50%;
  width: 100%;
  text-align: center;
}
.avatar {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}
</style>
