<!--
 * @Author: Xu Bai
 * @Date: 2020-07-24 16:34:35
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-24 16:45:49
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
              </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {},
  created () {}

}
</script>
<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}
</style>
