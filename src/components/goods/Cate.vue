<!--
 * @Author: Xu Bai
 * @Date: 2020-07-12 21:22:39
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-22 22:45:38
-->
<template>
    <div>
           <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-row>
                <el-col><el-button type="primary" @click="showAddCateDialog">添加分类</el-button></el-col>
            </el-row>
            <!-- 表格 -->
            <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false"
            show-index index-text="#" border class="treeTable"
            >
            <!-- 是否有效 -->
              <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i>
                <i class="el-icon-error" v-else style="color:red"></i>
              </template>
              <!-- 排序 -->
              <template slot-scope="scope" slot="order">
                <el-tag type="" size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                <el-tag type="warning" size="mini" v-else>三级</el-tag>
              </template>
              <!-- 操作 -->
              <template slot="opt" slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delte" size="mini" @click="alert('删除' + scope.row)">删除</el-button>

              </template>
            </tree-table>
            <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>
        <!-- 添加分类的对话框 -->
        <el-dialog
          title="添加分类"
          :visible.sync="addCateDialogVisible"
          width="50%"
          @close="addCateDialogClose"
          >
          <!-- 添加分类的表单 -->
          <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px" >
            <el-form-item label="分类名称：" prop="cat_name">
              <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>

            <el-form-item label="父级分类：" >
              <!-- options用来指定数据源 props用来指定配置对象-->
              <el-cascader :options="parentCateList" v-model="selectedKeys" @change="parentCateChanged"
              expand-trigger="hover" :props="cascaderProps" clearable change-on-select>

              </el-cascader>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 商品分类的数据列表
      catelist: [],
      // 总数据条数
      total: 0,
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // 父级分类的ID
        cat_pid: 0,
        // 添加分类的等级，默认是一级分类
        cat_level: 0
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 被选中的级联菜单
      selectedKeys: [],
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 为table指定列的定义
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      },
      {
        label: '是否有效',
        // 表示将当前列定义为模板列
        type: 'template',
        // 当前这一列使用的模板名称
        template: 'isok'
      },
      {
        label: '排序',
        // 表示将当前列定义为模板列
        type: 'template',
        // 当前这一列使用的模板名称
        template: 'order'
      },
      {
        label: '操作',
        // 表示将当前列定义为模板列
        type: 'template',
        // 当前这一列使用的模板名称
        template: 'opt'
      }
      ]
    }
  },
  methods: {
    // 获取商品分类数据
    async getCateList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('本次获取商品分类失败')
      // 保存数据列表
      this.catelist = res.data.result
      this.total = res.data.total
      console.log(this.catelist)
    },
    // 监听pageSize改变事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pageNum的改变
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 弹出添加分类对话框
    showAddCateDialog () {
      this.addCateDialogVisible = true
      this.getParentCateList()
    },
    // 获取父级分类的列表
    async getParentCateList () {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败')
      // console.log(res.data)
      this.parentCateList = res.data
    },
    // 选择项发生变化
    parentCateChanged () {
      // console.log(this.selectedKeys)
      // 如果selectedKeys数组中的length大于0证明选中了父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        console.log(this.selectedKeys[this.selectedKeys.length - 1])
        // 维当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        // 维当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 添加分类确定事件
    addCate () {
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请输入正确的表单项')
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) return this.$message.error('添加分类失败了')
        this.$message.success('添加分类成功了')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    // 添加分类对话框关闭事件
    addCateDialogClose () {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_name = ''
    }

  },
  created () {
    this.getCateList()
  }
}
</script>

<style lang="less" scoped>
.treeTable{
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}
</style>
