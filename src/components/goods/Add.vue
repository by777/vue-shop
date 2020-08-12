<!--
 * @Author: Xu Bai
 * @Date: 2020-08-11 16:46:16
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-08-12 14:20:25
-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
          <!-- 添加商品信息 -->
        <el-alert
          :closable="false"
          title="添加商品信息"
          type="info"
          center
          show-icon>
      </el-alert>
      <!-- 步骤提示进度条 -->
        <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <!-- tab栏区域 -->
          <!-- 表单 -->
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
            <el-tabs :tab-position="'left'"  v-model="activeIndex">
              <el-tab-pane label="基本信息" name="0">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="addForm.goods_name" placeholder="商品名称"></el-input>
                </el-form-item>

                <el-form-item label="商品价格" prop="goods_price">
                  <el-input v-model="addForm.goods_price" placeholder="" type="number"></el-input>
                </el-form-item>

                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input v-model="addForm.goods_weight" placeholder="" type="number"></el-input>
                </el-form-item>

                <el-form-item label="商品数量" prop="goods_number">
                  <el-input v-model="addForm.goods_number" placeholder="" type="number"></el-input>
                </el-form-item>

              </el-tab-pane>
              <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
              <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
              <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
              <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
            </el-tabs>
          </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 进度提示条激活的步骤
      activeIndex: '0',
      // 添加商品的表单
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0
      },
      // 添加商品的验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  methods: {}
}
</script>
<style lang="less" scoped>

</style>
