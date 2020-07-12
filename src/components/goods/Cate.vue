<!--
 * @Author: Xu Bai
 * @Date: 2020-07-12 21:22:39
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-12 21:30:48
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

            <!-- 分页区域 -->
        </el-card>
    </div>
</template>
<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
