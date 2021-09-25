<!--
 * @Date: 2021-09-24 14:07:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 23:59:41
-->
<template>
  <el-dialog :title="isEdit ? '编辑人员' : '新增人员'" :visible.sync="show" @close="cancle" :before-close="cancle">
    <el-form :model="people" :rules="rules" ref="people">
      <div class="avatar-box">
        <el-upload v-if="people.avatar == ''" action="https" :auto-upload="true" :http-request="uploadAvatar" :show-file-list="false" :limit="1">
          <div class="upload-button">
            <div class="upload-plus">+</div>
          </div>
        </el-upload>
        <el-avatar v-else shape="square" :size="80" fit="fill" :src="people.avatar"></el-avatar>
        <el-button style="margin-left: 15px" @click="people.avatar = ''">更换头像</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称" prop="nickname">
            <el-input v-model="people.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排名权重" prop="peoplename">
            <el-input v-model="people.rank" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="简介" prop="password">
        <el-input type="textarea" v-model="people.tips" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('people')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { creatPeople, getPeopleInfo, changePeople } from '@/api/people'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      id: '',
      people: {
        name: '',
        avatar: '',
        tips: '',
        rank: '',
      },
      isEdit: false,
      rules: {
        name: [{ required: true, message: '请输入人员名称', trigger: 'blur' }],
        tips: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        rank: [{ required: true, message: '请输入排名权重', trigger: 'blur' }],
      },
      loading: false,
      options: [],
    }
  },
  methods: {
    /**
     * @description: 头像上传
     * @param {Object} e 上传的图片文件
     */
    async uploadAvatar(e) {
      const res = await this.$uploader(e.file, '/avatar')
      this.people.avatar = res
    },
    async getInfoAndEdit(id) {
      this.id = id
      this.isEdit = true
      const res = await getPeopleInfo(id)
      console.log(res)
      this.people = res
    },
    restForm() {
      this.isEdit = false
      this.id = ''
      this.people = {
        name: '',
        avatar: '',
        tips: '',
        rank: '',
      }
    },
    /**
     * @description: 关闭表单
     */
    cancle() {
      this.restForm()
      this.$emit('cancle')
    },
    /**
     * @description: 新建人员
     * @param {*} formName 表单名称
     */
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (!this.isEdit) {
            // 新建
            await creatPeople(this.people)
            this.$message({
              type: 'success',
              message: '添加成功!',
            })
          } else {
            // 编辑
            await changePeople(this.id, this.people)
            this.$message({
              type: 'success',
              message: '编辑成功!',
            })
          }
          this.restForm()
          this.$emit('done')
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style>
.avatar-box {
  display: flex;
  align-items: center;
}
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
