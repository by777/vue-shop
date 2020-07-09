<!--
 * @Author: Xu Bai
 * @Date: 2020-07-09 13:41:58
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-09 15:58:51
-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <!-- 添加角色按钮区域 -->
            <el-row>
              <el-col >
                  <el-button type="primary">添加角色</el-button>
              </el-col>
            </el-row>
            <!-- 角色列表 -->
            <el-table :data="roleList" border stripe>
                <el-table-column type="expand"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                        {{scope.row.id}}
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
      // 所有角色列表数据
      roleList: []
    }
  },
  methods: {
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.roleList = res.data
      console.log(this.roleList)
    }
  },

  created () {
    this.getRolesList()
  }

}

</script>
<style lang="less" scoped>

</style>
