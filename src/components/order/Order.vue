<!--
 * @Author: Xu Bai
 * @Date: 2020-08-17 22:50:27
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-08-19 21:42:33
-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row>
              <el-col :span="8">
                  <el-input  placeholder="请输入内容">
                    <el-button icon="el-icon-search" slot='append'></el-button>
                  </el-input>
              </el-col>
            </el-row>
            <!-- 订单列表 -->
            <el-table :data="orderlist" border stripe >
              <el-table-column label="#" type="index"></el-table-column>
              <el-table-column label="订单编号" prop="order_number"></el-table-column>
              <el-table-column label="订单价格" prop="order_price"></el-table-column>
              <el-table-column label="是否付款" prop="pay_status">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.pay_status == '1'">已付款</el-tag>
                  <el-tag type="danger" v-else>未付款</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="是否发货" prop="is_send"></el-table-column>
              <el-table-column label="下单时间" prop="create_time">
                <template slot-scope='scope'>
                  {{scope.row.create_time | dateFormat}}
                </template>
              </el-table-column>
              <el-table-column label="操作" >
                <template >
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
                  <el-button type="success" icon="el-icon-location" size="mini" @click="showProcessBox"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>
        <!-- 修改地址 -->
        <el-dialog
          title="修改地址"
          :visible.sync="addressVisiable"
          width="30%"
          @close="addressDialogClosed"
          >
          <span>
        <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="auto">
          <el-form-item label="省市区/县" prop="address1">
            <!-- <el-input v-model="addressForm.address1"></el-input> -->
            <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
          </el-form-item>
        </el-form>
        </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addressVisiable = false">取 消</el-button>
            <el-button type="primary" @click="addressVisiable = false">确 定</el-button>
          </span>
        </el-dialog>
        // 展示物流进度的对话框
          <el-dialog
            title="物流进度"
            :visible.sync="processVisible"
            width="50%"
            >
            <span>
              <!-- 时间线 -->
                <el-timeline >
                  <el-timeline-item
                    v-for="(activity, index) in progressInfo"
                    :key="index"
                    :timestamp="activity.time">
                    {{activity.context}}
                  </el-timeline-item>
                </el-timeline>
            </span>
          </el-dialog>
    </div>
</template>
<script>
import cityData from './citydata.js'
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderlist: [],
      // 修改地址对话框
      addressVisiable: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      cityData,
      processVisible: false,
      // 物流进度
      progressInfo: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取订单列表失败！')
      this.total = res.data.total
      this.orderlist = res.data.goods
    },
    // 分页
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 页码值发生变化
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 展示修改地址
    showBox () {
      this.addressVisiable = true
    },
    addressDialogClosed () {
      this.$refs.addressFormRef.resetFields()
    },
    // 物流按钮
    async showProcessBox () {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) return this.$message.error('获取物流进度失败！')
      this.progressInfo = res.data
      console.log(res.data)
      this.processVisible = true
    }
  }
}
</script>
<style lang="less" scoped>

.el-cascader{
  width: 100%;
  // height: 50px;
}
</style>
