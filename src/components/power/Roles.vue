<!--
 * @Author: Xu Bai
 * @Date: 2020-07-09 13:41:58
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-11 17:40:58
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
                        <el-tag type="" closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 二级和三级权限 -->
                      <el-col :span="19">
                        <!-- 通过for渲染二级权限 -->
                        <el-row :class="[i2 == 0? '' :'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                          <el-col :span="6">
                            <el-tag type="success"  closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                          </el-col>
                          <el-col :span="18">
                            <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)"  >{{item3.authName}}</el-tag>

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
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                        {{scope.row.id}}
                    </template>
                </el-table-column>
            </el-table>
          </el-card>
              <!-- 分配权限的对话框 -->
                <el-dialog
                title="分配权限"
                :visible.sync="setRightDialogVisible"
                width="50%"
                @close="setRightDialogClosed"
                >
                <!-- 树形控件 -->
                <el-tree :data="rightslist"
                :props="treeProps"
                show-checkbox
                node-key="id"
                default-expand-all
                ref="treeRef"
                :default-checked-keys="defKeys"></el-tree>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="setRightDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="allotRights">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // 所有角色列表数据
      roleList: [],
      // 控制分配选线对话框显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形空间属性绑定对象
      treeProps: {
        // 显示的名称
        label: 'authName',
        // 父子嵌套字段
        children: 'children'
      },
      // 默认选中的节点id值数组
      defKeys: [],
      // 当前即将分配角色的id
      roleId: ''
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
      // 不知为何，如果调用的时候传入的是scope.row.id的话，会有标签移除动画不显示的异常，所以直接把整个role传进来了
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      this.$message.success('删除权限成功')
      // this.getRolesList()这个函数不建议，因为会发生页面完整的渲染
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog (role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限树失败')
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
      this.rightslist = res.data
      console.log('获取权限树成功')
    },
    // 递归获取角色下撒编辑权限的id并保存到defkey中
    getLeafKeys (node, arr) {
      if (!node.children) { return arr.push(node.id) }
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed () {
      this.defKeys = []
    },
    // 分配权限
    async allotRights () {
      // ... 展开运算符 ，展开后【合并】
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) return this.$message.error('分配权限请求失败')
      this.$message.success('分配权限成功')
      this.getRolesList()
      this.setRightDialogVisible = false
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
