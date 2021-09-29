<!--
 * @Date: 2021-09-29 14:05:09
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-29 14:42:55
-->
<template>
  <el-dialog title="新增别名转换" :visible.sync="show" :before-close="cancle">
    <el-form :model="form" :rules="rules" ref="form" label-position="top">
      <el-form-item label="原名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="alias">
        <el-tag :key="tag" v-for="(tag, index) in form.alias" closable :disable-transitions="false" @close="removeAlias(index)">
          {{ tag }}
        </el-tag>
        <el-input class="input-new-tag" v-if="showInputAlias" v-model="newAlias" ref="saveAliasInput" size="small" @keyup.enter.native="saveNewAlias" @blur="saveNewAlias"> </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新别名</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="newItem('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create } from '@/api/alias'
export default {
  props: {
    show: {
      type: Boolean,
    },
  },
  data() {
    return {
      form: {
        name: '',
        alias: [],
      },
      rules: {
        name: [{ required: true, message: '请输入原名称', trigger: 'blur' }],
        alias: [{ required: true, message: '请添加别名', trigger: 'blur' }],
      },
      showInputAlias: false,
      newAlias: '',
    }
  },
  methods: {
    cancle() {
      this.form = {
        name: '',
        alias: [],
      }
      this.$emit('cancle')
    },
    /**
     * @description: 移除别名
     * @param {Number} index 标签下标
     */
    removeAlias(index) {
      this.form.alias.splice(index, 1)
    },

    /**
     * @description: 添加新标签
     */
    showInput() {
      this.showInputAlias = true
      this.$nextTick(_ => {
        this.$refs.saveAliasInput.$refs.input.focus()
      })
    },

    /**
     * @description: 保存新标签
     */
    saveNewAlias() {
      let newAlias = this.newAlias
      if (newAlias) {
        this.form.alias.push(newAlias)
      }
      this.showInputAlias = false
      this.newAlias = ''
    },
    /**
     * @description: 新建别名转换
     * @param {*} formName 表单名称
     */
    newItem(formName) {
      this.showNewItem = false
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 深拷贝并转换成字符串
          var data = this.$_.cloneDeep(this.form)
          data.alias = data.alias.join(',')
          await create(data)
          this.$message({
            type: 'success',
            message: '添加成功!',
          })
          this.form = {
            name: '',
            alias: [],
          }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
