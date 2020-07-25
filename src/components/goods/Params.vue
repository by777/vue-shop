<!--
 * @Author: Xu Bai
 * @Date: 2020-07-24 16:34:35
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-25 23:32:07
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
                  @change="handleChange">
                  </el-cascader>
              </el-col>
            </el-row>
            <!-- Tab标签页 -->
             <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane label="动态参数" name="first">动态参数</el-tab-pane>
              <el-tab-pane label="静态属性" name="second">静态属性</el-tab-pane>
            </el-tabs>
        </el-card>
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
      activeName: 'first'
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
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        return this.$message.error('只能选择三级分类！')
      }
    },
    // Tab点击事件
    handleTabClick () {
      console.log(this.activeName)
    }
  },
  created () {
    this.getCateList()
  }

}
</script>
<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}
</style>
