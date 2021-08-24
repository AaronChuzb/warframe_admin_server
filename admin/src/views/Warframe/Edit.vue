<!--
 * @Date: 2021-08-20 22:38:44
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-24 22:49:06
-->
<template>
  <div class="page">
    <div class="form">
      <h1>{{id?'编辑战甲':'新增战甲'}}</h1>
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <div class="item">
          <el-divider class="title" >基本属性</el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="战甲名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="战甲类型">
                <el-select v-model="form.type" placeholder="请选择战甲类型">
                  <el-option label="普通" value="普通"></el-option>
                  <el-option label="圣装" value="圣装"></el-option>
                  <el-option label="暗影" value="暗影"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="段位需求">
                <el-input type="number" v-model="form.level"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="血量(30级)">
                <el-input type="number" v-model="form.hp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="护盾(30级)">
                <el-input type="number" v-model="form.sheild"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="能量(30级)">
                <el-input type="number" v-model="form.energy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="护甲(30级)">
                <el-input type="number" v-model="form.armor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="冲刺速度">
            <el-input-number v-model="form.speed" :step="0.05" :min="1" :max="6" label="描述文字"></el-input-number>
          </el-form-item>
        </div>
        <div class="item">
          <el-divider class="title" >极性</el-divider>
          <el-form-item label="极性槽">
            <el-checkbox-group v-model="form.self_pole" class="checkgroup" @change="checkBoxChange">
              <div v-for="(item, index) in self_pole_list" :key="index">
                <el-checkbox :label="item" :checked="item.checked" name="type"><div><i class="iconfont" :class="item.className"></i> 数量：</div> </el-checkbox>
                <el-input-number v-model="item.num" :min="1" :max="6" label="描述文字"></el-input-number>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="光环极性槽">
            <el-radio-group v-model="form.halo_pole">
              <el-radio :label="item"  v-for="(item, index) in halo_pole_list" :key="index"><i class="iconfont" :class="item"></i></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="item">
          <el-divider class="title" >技能</el-divider>
          <el-form-item label="被动技能">
            <el-input type="textarea" v-model="form.passive_skill"></el-input>
          </el-form-item>
          <div class="skills" v-for="(item, index) in form.skills" :key="'skill'+index">
            <el-divider content-position="right">技能{{ index + 1 }}</el-divider>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="技能名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="消耗能量">
                  <el-input v-model="item.spend"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="技能描述">
              <el-input type="textarea" v-model="item.des"></el-input>
            </el-form-item>
            <div style="text-align: right">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteSkill(index)"></el-button>
            </div>
          </div>
          <el-button type="primary" @click="newSkill">新增技能</el-button>
        </div>
        <div class="item">
          <el-divider class="title" >列表封面图</el-divider>
          <el-upload
            class="avatar-uploader"
            :class="[form.img.length > 0?'disabled':'' ]"
            action="https://www.hualigs.cn/api/upload"
            list-type="picture-card"
            :http-request="uploader"
            :file-list="file_list"
            :limit="1"
            :on-remove="handleRemove">
            <i class="el-icon-plus" ></i>
          </el-upload>
        </div>
        <div class="item">
          <el-divider class="title" >战甲介绍内容</el-divider>
          <div id="editor" class="editor"></div>
        </div>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="onSubmit">提交数据</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploader from '../../plugins/oss'
import wangEditor from "wangeditor"

export default {
  props: {
    id: { type: String }
  },
  data(){
    return{
      file_list: [],
      editor: null,
      self_pole_list: [
        { className: 'icon-naramon', num: 1, checked: false },
        { className: 'icon-madurai', num: 1, checked: false },
        { className: 'icon-vazarin', num: 1, checked: false },
        { className: 'icon-zenurik', num: 1, checked: false },
        { className: 'icon-umbra', num: 1, checked: false },
      ],
      dialogImageUrl: "",
      dialogVisible: "",
      halo_pole_list: ['icon-naramon','icon-madurai','icon-vazarin','icon-zenurik','icon-aura'],
      form: {
        name: '', // 战甲名称
        type: '', // 战甲类型
        img: [], // 图片列表
        level: '', // 战甲段位需求
        hp: '', // 血量
        sheild: '', // 护盾
        energy: '', // 能量
        armor: '', // 护甲
        speed: '',  // 冲刺速度读
        self_pole: [], // 极性槽
        halo_pole: '', // 光环极性槽
        passive_skill: '', // 被动技能
        skills: [ // 技能列表
          { name: "", spend: "", des: ""},
        ],
        editorData: '' // 富文本内容
      },
      num: 0,
      
    }
  },
  mounted(){
    
    const editor = new wangEditor(`#editor`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.form.editorData = newHtml
    }
    // 配置菜单栏，设置不需要的菜单
    editor.config.excludeMenus = [
      'emoticon',
      'video',
      'code',
      'fontName',
      'todo'
    ]
    editor.config.uploadImgMaxSize = .5 * 1024 * 1024
    editor.config.uploadImgMaxLength = 1
    editor.config.showLinkImg = false
    var upload = uploader
    editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      console.log(resultFiles[0])
      upload(resultFiles[0]).then(res=>{
        insertImgFn(res)
      })
    }
    editor.config.height = 650
    // 创建编辑器
    editor.create()
    this.editor = editor
    this.id && this.getData()
  },
  methods:{
    async getData(){
      const res = await this.$http.get('rest/warframes/'+this.id)
      this.form = res.data
      res.data.self_pole.forEach((item)=>{
        this.self_pole_list.forEach((child, index)=>{
          if(item.className == child.className){
            this.self_pole_list[index] = item
          }
        })
      })
      this.file_list = [{name: '',url: this.form.img[0]}]
      this.editor.txt.html(res.data.editorData)
    },
    handleRemove() {
      // TODO: 处理图片删除事件
    },
    async onSubmit(){
      if(this.id){
        await this.$http.put('rest/warframes/'+this.id, this.form)
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        await this.$http.post('rest/warframes', this.form)
        this.$message({
          type: 'success',
          message: '创建成功'
        })
      }
      this.$router.push('/warframe/list')
    },
    newSkill(){
      this.form.skills.push({ name: "", spend: "", des: ""})
    },
    deleteSkill(index){
      this.form.skills.splice(index, 1)
    },
    checkBoxChange(e){
      this.form.self_pole = e
      e.forEach((item)=>{
        this.self_pole_list.forEach(child=>{
          if(item.className == child.className){
            child = item
          }
        })
      })
    },
    async uploader(e){
      console.log(e)
      /* if(this.$store.getters.getOss.accessKeyId === ''){
       
      } */
      const url = await uploader(e.file)
      this.form.img.push(url)
     
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style lang="less">
  .page{
  background: #f2f2f2;
  width: 100%;
  .form{
    .item{
      padding: 2vw;
      background: #fff;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
      margin-bottom: 2vw;
      .title{
        font-weight: bold !important;
        
      }
      .skills{
        clear: both;
        padding: 2vw;
        border: 1px solid #DCDFE6;
        border-radius: 10px;
        margin-bottom: 2vw;
      }
      
    }
  }
}
.editor{
  width: 375px;
  margin: 0 auto;
}
.disabled .el-upload--picture-card {
  display: none;
}
</style>