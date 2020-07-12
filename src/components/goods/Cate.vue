<!--
 * @Author: Xu Bai
 * @Date: 2020-07-12 21:22:39
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-12 21:57:39
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
      }]
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
