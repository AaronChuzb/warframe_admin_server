<!--
 * @Date: 2021-09-24 14:07:38
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-24 18:27:30
-->
<template>
  <el-dialog :title="isEdit ? '编辑日志' : '新增日志'" :visible.sync="show" @close="cancle" :before-close="cancle">
    <el-form :model="log" :rules="rules" ref="log" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="日志类型" prop="type">
            <el-select v-model="log.type">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户端版本" prop="version">
            <el-input v-model="log.version" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="更新日期" prop="date">
            <el-date-picker value-format="yyyy-MM-dd" v-model="log.date" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="log.status">
              <el-option v-for="item in statusOptions" :key="item.name" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="日志内容" prop="content">
        <el-input type="textarea" v-model="log.content" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('log')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createLog, getLogInfo, changeLog, getType } from '@/api/log'
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
      log: {
        content: '',
        type: '',
        status: 0,
        date: '',
        version: '',
      },
      isEdit: false,
      rules: {
        type: [{ required: true, message: '请选择日志类型', trigger: 'blur' }],
        content: [{ required: true, message: '请输入日志详细', trigger: 'blur' }],
        date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        version: [{ required: true, message: '请输入客户端版本', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      loading: false,
      options: [],
      statusOptions: [
        { name: '未完成', _id: 0 },
        { name: '进行中', _id: 1 },
        { name: '已完成', _id: 2 },
      ]
    }
  },
  methods: {
    async getTypes(){
      if(this.options.length == 0){
        const res = await getType()
        this.options = res
      }
    },
    async getInfoAndEdit(id) {
      this.id = id
      this.isEdit = true
      this.getTypes()
      const res = await getLogInfo(id)
      this.log = res
    },
    restForm() {
      this.isEdit = false
      this.id = ''
      this.log = {
        content: '',
        type: '',
        status: '',
        date: '',
        version: '',
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
     * @description: 新建日志
     * @param {*} formName 表单名称
     */
    save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (!this.isEdit) {
            // 新建
            await createLog(this.log)
            this.$message({
              type: 'success',
              message: '添加成功!',
            })
          } else {
            // 编辑
            await changeLog(this.id, this.log)
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
