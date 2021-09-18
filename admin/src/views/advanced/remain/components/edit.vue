<!--
 * @Date: 2021-09-13 17:24:27
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-18 11:46:12
-->
<template>
  <el-dialog :title="isEdit ? '编辑遗物' : '新增遗物'" :visible.sync="show" @close="cancle" :before-close="cancle">
    <el-form :model="remain" :rules="rules" ref="remain" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="遗物名称" prop="name">
            <el-input placeholder="请输入内容" v-model="remain.name" class="input-with-select" @blur="transName()">
              <el-select v-model="remain.type" slot="prepend" placeholder="遗物类型" style="width: 120px">
                <el-option :label="item.name" :value="item._id" v-for="item in types" :key="item._id"></el-option>
              </el-select>
              <template slot="append">遗物</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="铜一档" prop="copper_1">
            <el-select style="width: 100%" v-model="remain.copper_1" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="铜二档" prop="copper_2">
            <el-select style="width: 100%" v-model="remain.copper_2" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="铜三档" prop="copper_3">
            <el-select style="width: 100%" v-model="remain.copper_3" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="银一档" prop="silver_1">
            <el-select style="width: 100%" v-model="remain.silver_1" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银二档" prop="silver_2">
            <el-select style="width: 100%" v-model="remain.silver_2" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="金档" prop="gold">
            <el-select style="width: 100%" v-model="remain.gold" filterable remote reserve-keyword placeholder="通过关键词搜索" :remote-method="searchInput" :loading="loading">
              <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="是否入库" prop="parent">
            <el-switch style="display: block" v-model="remain.stock" inactive-color="#13ce66" active-color="#ff4949" active-text="入库" inactive-text="未入库"> </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="获取地点" prop="getways">
            <el-input type="textarea" :autosize="{ minRows: 4 }" placeholder="请输入内容" v-model="remain.getways"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="词条贡献者" prop="parent">
            <el-input placeholder="请输入内容" v-model="remain.contribute"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="save('remain')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getType, search, create, getInfo, change } from "@/api/remain";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      id: "",
      remain: {
        name: "",
        type: "",
        copper_1: "",
        copper_2: "",
        copper_3: "",
        silver_1: "",
        silver_2: "",
        gold: "",
        stock: false,
        getways: "已进入奥罗金宝库",
        contribute: "",
      },
      isEdit: false,
      rules: {
        name: [{ required: true, message: "请输入遗物名称", trigger: "blur" }],
        copper_1: [{ required: true, message: "请选择铜一档部件", trigger: "blur" }],
        copper_2: [{ required: true, message: "请选择铜二档部件", trigger: "blur" }],
        copper_3: [{ required: true, message: "请选择铜三档部件", trigger: "blur" }],
        silver_1: [{ required: true, message: "请选择银一档部件", trigger: "blur" }],
        silver_2: [{ required: true, message: "请选择银二档部件", trigger: "blur" }],
        gold: [{ required: true, message: "请选择金部件", trigger: "blur" }],
        getways: [{ required: true, message: "请输入获取方式", trigger: "blur" }],
      },
      loading: false,
      options: [],
      types: [],
    };
  },
  created(){
    this.restForm()
  },
  methods: {
    async getPreData() {
      this.types = await getType();
      if (this.types.length > 0) {
        this.remain.type = this.types[0]._id;
      }
    },
    async getInfoAndEdit(id) {
      this.id = id;
      this.isEdit = true;
      this.getPreData();
      const res = await getInfo(id);
      // 处理部件
      let keys = [ 'copper_1', 'copper_2', 'copper_3', 'silver_1', 'silver_2', 'gold' ]
      let data = JSON.parse(JSON.stringify(res))
      keys.forEach(item=>{
        if(data[item] != null){
          this.options.push(data[item])
        }
        data[item] = data[item]._id
      })
      this.remain = data
      this.transName()
    },
    restForm() {
      this.isEdit = false;
      this.id = "";
      this.options = [];
      this.remain = {
        name: "",
        type: "",
        copper_1: "",
        copper_2: "",
        copper_3: "",
        silver_1: "",
        silver_2: "",
        gold: "",
        stock: false,
        getways: "已进入奥罗金宝库",
        contribute: this.$store.getters.name,
      };
    },
    /**
     * @description: 关闭表单
     */
    cancle() {
      this.restForm();
      this.$emit("cancle");
    },
    /**
     * @description: 选择框远端搜索
     * @param {String} e 关键词
     */
    async searchInput(e) {
      if (e == "") return;
      this.loading = true;
      const res = await search(e);
      this.options = res;
      this.options.splice(1, 0);
      this.loading = false;
    },
    /**
     * @description: 新建遗物与编辑遗物
     * @param {*} formName 表单名称
     */
    save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 提交前处理,名称拼接
          let prepend;
          this.types.some((e) => {
            if (this.remain.type == e._id) {
              prepend = e.name;
              return;
            }
          });
          this.remain.name = prepend + this.remain.name + "遗物";
          if (!this.isEdit) {
            // 新建
            await create(this.remain);
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          } else {
            // 编辑
            await change(this.id, this.remain);
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
          }
          this.restForm();
          this.$emit("done");
        } else {
          return false;
        }
      });
    },
    /**
     * @description: 取出名称中的英文和数字,并将字母转换成大写.
     */
    transName() {
      if (this.remain.name != "") {
        this.remain.name = this.remain.name
          .match(/[0-9a-z]/gi)
          .join("")
          .toUpperCase();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-with-selec .el-select .el-input {
  width: 130px !important;
}
</style>
