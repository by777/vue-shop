<!--
 * @Author: Xu Bai
 * @Date: 2020-07-09 13:41:58
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-11 15:53:28
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
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-row :class="['bdbottom',i1 === 0?'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                      <!-- 一级权限 -->
                      <el-col :span="5">
                        <el-tag type="">{{item1.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 二级和三级权限 -->
                      <el-col :span="19">
                        <!-- 通过for渲染二级权限 -->
                        <el-row :class="[i2 == 0? '' :'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                          <el-col :span="6">
                            <el-tag type="success" >{{item2.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                          </el-col>
                          <el-col :span="18">
                            <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)" :disable-transitions="false" >{{item3.authName}}</el-tag>

                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <pre>

                    </pre>
                  </template>
                </el-table-column>
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
    },
    // 根据id删除权限
    async removeRightById (role, rightId) {
      // 弹框确认
      const confirmResult = await this.$confirm('此操作将永久移除权限是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'

      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult === 'cancel') {
        return this.$message.info('取消了删除权限')
      }
      console.log(role, rightId)
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      this.$message.success('删除权限成功')
      // 这个函数不建议，因为会发生页面完整的渲染this.getRolesList()
      role.children = res.data
    }
  },

  created () {
    this.getRolesList()
  }

}

</script>
<style lang="less" scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;

}
.vcenter{
  display: flex;
  align-items: center;
}
</style>
