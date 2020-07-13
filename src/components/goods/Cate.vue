<!--
 * @Author: Xu Bai
 * @Date: 2020-07-12 21:22:39
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-13 20:21:16
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
                <el-col><el-button type="primary">添加分类</el-button></el-col>
            </el-row>
            <!-- 表格 -->
            <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false"
            show-index index-text="#" border
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
        </el-card>
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
    }
  },
  created () {
    this.getCateList()
  }
}
</script>

<style lang="less" scoped>

</style>
