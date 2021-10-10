<!--
 * @Date: 2021-10-09 15:38:37
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-10-10 17:27:52
-->
<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" >
    <img @click="show = true" :src="require('@/assets/plus.png')" class="image" />
    <div style="padding: 10px; font-size: 12px">
      <div @click="show = true">新增</div>
      <div style="display: flex;opacity: 0;">新增<el-image style="width: 12px; height: 12px" :src="require('@/assets/gj.png')" fit="fill"></el-image></div>
      <div></div>
      <div class="bottom clearfix">
        <el-button type="text" class="button" style="opacity: 0;">1</el-button>
        <el-button type="text" class="button danger" style="opacity: 0;">1</el-button>
      </div>
    </div>
  </el-card>
    <el-dialog :title="isEdit ? '编辑奖励' : '新增奖励'" :visible.sync="show" @close="cancle" :before-close="cancle">
      <el-form :model="rotation" :rules="rules" ref="rotation" label-position="top">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="奖励图片" prop="img">
              <el-upload class="avatar-uploader" action="" :http-request="uploadImg" :show-file-list="false">
                <img v-if="rotation.img" :src="rotation.img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="奖励名称" prop="name">
              <el-input v-model="rotation.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="钢精数量" prop="price">
              <el-input v-model="rotation.price" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="save('rotation')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { create, getInfo, change } from "@/api/rotation";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      id: '',
      rotation: {
        img: '',
        name: '',
        price: '',
        is_ratation: false,
        rank: null
      },
      isEdit: false,
      rules: {
        img: [{ required: true, message: '请上传奖励图片', trigger: 'blur' }],
        name: [{ required: true, message: '请输入奖励名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入兑换奖励钢精数量', trigger: 'blur' }],
      },
      loading: false,
      options: [],
    }
  },
  methods: {
    /**
     * @description: 图片上传
     * @param {Object} e 上传的图片文件
     */
    async uploadImg(e) {
      // 存在链接代表已经上传过图片，要重新上传先删除旧图片
      if(this.rotation.img != ''){
        await this.$deleteImg(this.rotation.img.split('com/')[1])
      }
      const res = await this.$uploader(e.file, '/rotation');
      this.rotation.img = res;
    },
    async getInfoAndEdit(id) {
      this.id = id
      this.isEdit = true
      const res = await getInfo(id)
      console.log(res)
      let data = JSON.parse(JSON.stringify(res))
      this.rotation = res
      this.show = true
    },
    restForm() {
      this.isEdit = false
      this.id = ''
      this.rotation = {
        img: '',
        name: '',
        price: '',
        is_ratation: false,
        rank: null
      }
    },
    /**
     * @description: 关闭表单
     */
    async cancle() {
      if(this.rotation.img != ''){
        await this.$deleteImg(this.rotation.img.split('com/')[1])
      }
      this.restForm()
      this.show = false
    },
    /**
     * @description: 新建奖励
     * @param {*} formName 表单名称
     */
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (!this.isEdit) {
            // 新建
            await create(this.rotation);
            this.$message({
              type: 'success',
              message: '添加成功!',
            })
          } else {
            // 编辑
            await change(this.id, this.rotation)
            this.$message({
              type: 'success',
              message: '编辑成功!',
            })
          }
          this.restForm()
          this.show = false
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.image {
  width: 100%;
  display: block;
  background: #999;
}

</style>
