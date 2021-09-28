<!--
 * @Date: 2021-09-24 22:18:20
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-28 15:42:41
-->
<template>
  <div class="app-container">
    <div class="content">
      <div class="phone">
        <img src="@/assets/iphonex.png" alt="" />
        <div class="editorData">
          <div class="title">关于</div>
          <div v-html="text" class="rich-text"></div>
          <el-button class="button" type="primary" @click="save">保存</el-button>
        </div>
      </div>
      <div>
        <div id="editor" class="editor"></div>
      </div>
    </div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'
import { create, getInfo, change } from '@/api/about'
export default {
  name: 'about',
  data() {
    return {
      editor: null,
      id: '',
      text: '',
      isEdit: false,
      pageData: {},
    }
  },
  created() {
    
  },
  methods: {
    async getData() {
      const res = await getInfo()
      if (res != '') {
        this.isEdit = true
        this.id = res._id
        this.text = res.text
        this.pageData = res
        this.editor.txt.html(this.text) 
      }
    },
    async save() {
      if (this.isEdit) {
        await change(this.id, { text: this.text, creator: this.pageData.creator })
      } else {
        await create({ text: this.text })
        this.isEdit = true
      }
      this.$message({
        type: 'success',
        message: '编辑成功',
      })
    },
  },
  async mounted() {
    const editor = new wangEditor(`#editor`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.text = newHtml
    }
    // 配置菜单栏，设置不需要的菜单
    editor.config.excludeMenus = ['emoticon', 'video', 'code', 'fontName', 'todo']
    editor.config.uploadImgMaxSize = 0.5 * 1024 * 1024
    editor.config.uploadImgMaxLength = 1
    editor.config.showLinkImg = false
    var upload = this.$uploader
    editor.config.customUploadImg = function(resultFiles, insertImgFn) {
      upload(resultFiles[0], '/rich-text').then(res => {
        insertImgFn(res)
      })
    }
    editor.config.height = 650
    editor.create()
    this.editor = editor
    await this.getData()
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.editor {
  width: 375px;
}
.content {
  display: flex;
  justify-content: space-around;
  .phone {
    position: relative;
    img {
      width: 375px;
    }
    .editorData {
      width: 335px;
      position: absolute;
      top: 44px;
      left: 27px;
      font-size: 16px;
      .title {
        text-align: center;
        margin-top: 15px;
        margin-right: 15px;
      }
      .rich-text {
        height: 606px;
        overflow-y: scroll;
      }
    }
  }
}
.button {
  // float: right;
  display: block;
  margin: 10px auto;
  width: 300px;
  margin-right: 25px;
}
</style>
