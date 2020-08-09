<!--
 * @Author: Xu Bai
 * @Date: 2020-08-08 21:30:06
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-08-09 22:44:09
-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row :gutter="20">
              <el-col :span="8">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary">添加商品</el-button>
              </el-col>
            </el-row>
            <!-- table表格 -->
            <el-table :data="goodslist" border stripe >
              <el-table-column label="#" type="index"></el-table-column>
              <el-table-column label="商品名称" prop="goods_name"></el-table-column>
              <el-table-column label="商品价格/元" prop="goods_price" width="70px"></el-table-column>
              <el-table-column label="商品重量/kg" prop="goods_weight" width="70px"></el-table-column>
              <el-table-column label="创建时间" prop="add_time" width="150px">
                <template slot-scope="scope">
                  {{scope.row.add_time | dateFormat}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    {{scope.row.goods_id}}
                </template>
              </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {

  data () {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 请求返回的GOODS
      goodslist: [],
      // 总数据条数
      total: 0

    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 分页获取商品列表
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败！')
      // console.log(res.data)
      this.goodslist = res.data.goods
      this.total = res.data.total
    }
  }
}
</script>
<style lang="less" scoped>

</style>
