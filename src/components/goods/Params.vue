<!--
 * @Author: Xu Bai
 * @Date: 2020-07-24 16:34:35
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-30 21:54:34
-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 头部的警告区域 -->
            <el-alert show-icon type="warning" title="注意：只能为3级分类设置参数!"></el-alert>
            <!-- 选择商品分类区域 -->
            <el-row class="cat_opt">
              <el-col>
                  <span>选择商品分类：</span>
                  <!-- 选择商品分类的级联选择框 -->
                  <el-cascader
                  v-model="selectedCateKeys"
                  :options="cateList"
                  :props="cateProps"
                  clearable
                  @change="handleChange">
                  </el-cascader>
              </el-col>
            </el-row>
            <!-- Tab标签页 -->
             <el-tabs v-model="activeName" @tab-click="handleTabClick">
               <!-- 添加动态参数的面板 -->
              <el-tab-pane label="动态参数" name="many">
                <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="addDialogVisible=true">添加参数</el-button>
                <!-- 动态参数表格 -->
                <el-table :data="manyTableData" border stripe >
                  <!-- 展开行 -->
                  <el-table-column label="#" type="expand"></el-table-column>
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                  <el-table-column label="操作" >
                    <template slot-scope="scope">{{scope.row.attr_id}}
                      <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    </template>
                  </el-table-column>

                </el-table>
              </el-tab-pane>
              <!-- 添加静态属性的面板 -->
              <el-tab-pane label="静态属性" name="only">
                <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="addDialogVisible=true">添加属性</el-button>
                <!-- 静态属性表格 -->
                <el-table :data="onlyTableData" border stripe >
                  <!-- 展开行 -->
                  <el-table-column label="#" type="expand"></el-table-column>
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                  <el-table-column label="操作" >
                    <template slot-scope="scope">{{scope.row.attr_id}}
                      <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    </template>
                  </el-table-column>

                </el-table>
              </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 添加参数的对话框 -->
        <el-dialog
          :title="'添加'+titleText"
          :visible.sync="addDialogVisible"
          @close="addDiaglogClosed"
          width="50%"
          >
          <!-- 添加参数的对话框 -->
          <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="100px" >
            <el-form-item :label="titleText" prop="attr_name">
              <el-input  v-model="addForm.attr_name" ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addParams">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
  data () {
    return {
      // 商品分类列表
      cateList: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys: [],
      // 页被激活的签Tabs
      activeName: 'many',
      // 动态参数的数据
      manyTableData: [],
      // 静态属性的数据
      onlyTableData: [],
      // 添加参数对话框的显示与隐藏
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: ''
      },
      // 验证规则
      addFormRules: {
        attr_name: [
          {
            required: true,
            message: '请输入参数名称',
            triggger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 获取所有的商品分类列表
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取商品数据失败！')
      this.cateList = res.data
      console.log(this.cateList)
    },
    // 级联选择框选中变化
    handleChange () {
      this.getParamsData()
    },

    // Tab点击事件
    handleTabClick () {
      this.getParamsData()
    },
    // 获取参数列表
    async getParamsData () {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        return this.$message.error('只能选择三级分类！')
      }
      // 根据所选分类的ID和面板获取对应的参数
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
        { params: { sel: this.activeName } })
      if (res.meta.status !== 200) return this.$message.error('获取参数失败！')
      console.log(res.data)
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        (
          this.onlyTableData = res.data
        )
      }
    },
    // 对话框关闭
    addDiaglogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击确定添加参数
    addParams () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('本地验证失败！')
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        if (res.meta.status !== 201) return this.$message.error('添加参数失败！')
        this.$message.success('添加参数成功！')
        this.addDialogVisible = false
        this.getParamsData()
      })
    }

  },
  created () {
    this.getCateList()
  },
  computed: {
    // 如果按钮需要被禁用,则返回true
    isBtnDisable () {
      if (this.selectedCateKeys.length !== 3) { return true } else { return false }
    },
    // 当前选中的3级分类的ID
    cateId () {
      if (this.selectedCateKeys.length === 3) return this.selectedCateKeys[2]
      return null
    },
    // 计算标题的文本
    titleText () {
      if (this.activeName === 'many') return '动态参数'
      else return '静态属性'
    }
  }
}

</script>
<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}
</style>
